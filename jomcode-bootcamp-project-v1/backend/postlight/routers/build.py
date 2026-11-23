from typing import Annotated
from uuid import UUID

# import psycopg
from psycopg.rows import dict_row
from fastapi import APIRouter, HTTPException, UploadFile, Depends, File, Form
from postlight.database import connection
from postlight.services.posts import serialize_post
from postlight.dependencies import current_user
from postlight.services.storage import remove_image_best_effort, store_image
router = APIRouter(prefix="/Build-PC")





@router.get("")
def pc_list():
    with connection() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute("select * from pc_build order by created_at desc")
            return [serialize_post(row) for row in cur.fetchall()]




@router.get("/{post_id}")
def get_list(post_id: int):
    with connection() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute("select * from pc_build where id = %s", (post_id,))
            row = cur.fetchone()
        if row is None:
            raise HTTPException(404, "Post not found")
        return serialize_post(row)
        
        


@router.post("", status_code=201)
async def new_build(
    build_name: Annotated[str, Form()],
    user_id: Annotated[UUID, Depends(current_user)],
    cpu: Annotated[str, Form()] = "",
    cpu_cooler: Annotated[str, Form()] = "",
    motherboard: Annotated[str, Form()] = "",
    ram: Annotated[str, Form()] = "",
    graphic_card: Annotated[str, Form()] = "",
    storage_drive: Annotated[str, Form()] = "",
    pc_case: Annotated[str, Form()] = "",
    power_supply: Annotated[str, Form()] = "",
    image: UploadFile | None = File(default=None),
):
    if not build_name.strip():
        raise HTTPException(422, "Name required")
    new_path = await store_image(image, user_id)
    try:
        with connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute(
                    "insert into pc_build (author_id, build_name, cpu, cpu_cooler, motherboard, ram, " \
                "graphic_card, storage_drive, pc_case, power_supply, image_path) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning *",
                (user_id, build_name.strip(), cpu.strip(), cpu_cooler.strip(), motherboard.strip(), ram.strip(), graphic_card.strip(), storage_drive.strip(), pc_case.strip(), power_supply.strip(), new_path),
                )
                row = cur.fetchone()
                return serialize_post(row)
    except Exception:
        remove_image_best_effort(new_path)
        raise
         


@router.put("/{post_id}")
async def update_build(
    post_id: int,
    build_name: Annotated[str, Form()],
    user_id: Annotated[UUID, Depends(current_user)],
    cpu: Annotated[str, Form()] = "",
    cpu_cooler: Annotated[str, Form()] = "",
    motherboard: Annotated[str, Form()]= "",
    ram: Annotated[str, Form()] = "",
    graphic_card: Annotated[str, Form()] = "",
    storage_drive: Annotated[str, Form()] = "",
    pc_case: Annotated[str, Form()] = "",
    power_supply: Annotated[str, Form()] = "",
    remove_existing_image: bool = Form(default=False),
    image: UploadFile | None = File(default=None),
):
    if not build_name.strip():
        raise HTTPException(422, "Name required")
    if image and remove_existing_image:
        raise HTTPException(422, "Choose a replacement image or remove the current image")
    new_path = await store_image(image, user_id)
    old_path = None
    try:
        with connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
               cur.execute("select * from pc_build where id = %s for update", (post_id,))
               old = cur.fetchone()
               if old is None:
                   raise HTTPException(404, "Post not found")
               if old["author_id"] != user_id:
                   raise HTTPException(403, "You can only edit your own build")
               old_path = old["image_path"]
               path = new_path if new_path else (None if remove_existing_image else old_path)
               cur.execute(
                   "update pc_build set build_name = %s, cpu = %s, cpu_cooler = %s, motherboard = %s, " \
                 "ram = %s, graphic_card = %s, storage_drive = %s, pc_case = %s, power_supply = %s, image_path = %s, updated_at = now() where id = %s returning *",
                 (build_name.strip(), cpu.strip(), cpu_cooler.strip(), motherboard.strip(), ram.strip(), graphic_card.strip(), storage_drive.strip(), pc_case.strip(), power_supply.strip(), path, post_id),
               )
               row = cur.fetchone()
    except Exception:
        remove_image_best_effort(new_path)
        raise
    if old_path and old_path != path:
        remove_image_best_effort(old_path)
    return serialize_post(row)
     
             




@router.delete("/{post_id}", status_code=204)
def delete_build(post_id: int, user_id: Annotated[UUID, Depends(current_user)]):
    with connection() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute("select author_id, image_path from pc_build where id = %s for update", (post_id,))
            row = cur.fetchone()
            if row is None:
                raise HTTPException(404, "Post not found")
            if row["author_id"] != user_id:
                raise HTTPException(403, "You can only delete your own build")
            cur.execute("delete from pc_build where id = %s", (post_id,))
    remove_image_best_effort(row["image_path"])


