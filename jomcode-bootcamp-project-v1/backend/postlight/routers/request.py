from typing import Annotated
from uuid import UUID

from psycopg.rows import dict_row
from fastapi import APIRouter, HTTPException, Form
from postlight.services.request import request_form
from postlight.database import connection
router = APIRouter(prefix="/part-request")



@router.get("")
def part_list():
    with connection() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute("select * from part_request order by created_at desc")
            return [request_form(row) for row in cur.fetchall()]



@router.post("", status_code=201)
async def part_field(
    message: Annotated[str, Form()],
):
    if not message.strip():
       raise HTTPException(422, "required text")
    with connection() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute("insert into part_request (author_id, message) values (%s,%s) returning *",
                        (None, message.strip()),)
            row = cur.fetchone()
            return request_form(row)
            