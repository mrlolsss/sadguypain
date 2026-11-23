# • Handle author_id when it is None (Guest Submissions):
# • When a guest submits without logging in, row["author_id"] is None. If a logged-in user submits, row["author_id"] is a UUID object.
# • Using str(row["author_id"]) if row["author_id"] else None ensures FastAPI cleanly converts any UUID to a string while safely keeping None for guests.


def request_form(row: dict) -> dict:
    return{
        "id": row["id"],
        "author_id": row["author_id"] if row ["author_id"] else None,
        "message": row["message"],
        "created_at": row["created_at"].isoformat()
    }
