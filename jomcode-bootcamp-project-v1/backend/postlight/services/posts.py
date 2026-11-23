from postlight.services.storage import image_url


def serialize_post(row: dict) -> dict:
    return {
        "id": row["id"],
        "author_id": str(row["author_id"]),
        "build_name": row["build_name"],
        "cpu": row["cpu"],
        "cpu_cooler": row["cpu_cooler"],
        "motherboard": row["motherboard"],
        "ram": row["ram"],
        "graphic_card": row["graphic_card"],
        "storage_drive": row["storage_drive"],
        "pc_case": row["pc_case"],
        "power_supply": row["power_supply"],
        "image_url": image_url(row["image_path"]),
        "created_at": row["created_at"].isoformat(),
        "updated_at": row["updated_at"].isoformat(),
    }



