from fastapi import APIRouter, UploadFile, HTTPException, status, Response, Depends
from dependencies.user import UserDependency

router = APIRouter(tags=['images'])


allow_image_extensions = [
    {
        'file_extension': '.jpg',
        'mimetype': 'jpg'
    },
    {
        'file_extension': '.jpeg',
        'mimetype': 'jpg'
    },
    {
        'file_extension': '.png',
        'mimetype': 'png'
    },
]


@router.get("/images")
async def get_images():
    import os
    return os.listdir('public/images')


@router.get("/images/{file_name}")
async def get_image(file_name: str):
    checked_extension = False
    for index, allow_image_extension in enumerate(allow_image_extensions):
        input_file_extention = file_name[-len(
            allow_image_extension['file_extension']):]
        if input_file_extention == allow_image_extension['file_extension']:
            checked_extension = True
            break
    if not checked_extension:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='file extension not acceptable')
    try:
        with open('public/images/' + file_name, 'br') as image:
            return Response(content=image.read(), media_type='image/' + allow_image_extensions[index]['mimetype'])
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='file not found')


@router.post("/images", status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile, user_dependency: UserDependency = Depends()):
    checked_extension = False
    for allow_image_extension in allow_image_extensions:
        input_file_extension = file.filename[-len(
            allow_image_extension['file_extension']):]
        if input_file_extension == allow_image_extension['file_extension']:
            checked_extension = True
            break
    if not checked_extension:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='file extension not acceptable')
    with open('public/images/' + file.filename, 'bw') as new_image:
        new_image.write(file.file.read())
        return {"filename": file.filename}


@router.delete("/images/{file_name}", status_code=status.HTTP_410_GONE)
async def delete_image(file_name: str, user_dependency: UserDependency = Depends()):
    checked_extension = False
    for allow_image_extension in allow_image_extensions:
        input_file_extension = file_name[-len(
            allow_image_extension['file_extension']):]
        if input_file_extension == allow_image_extension['file_extension']:
            checked_extension = True
            break
    if not checked_extension:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='file extension not acceptable')
    import os
    if file_name not in os.listdir('public/images'):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='file not found')
    os.remove('public/images/' + file_name)
    return None


allow_video_extensions = [{'file_extension': '.flv', 'mimetype': 'video/x-flv'},
                          {'file_extension': '.mp4', 'mimetype': 'video/mp4'},
                          {'file_extension': '.m3u8','mimetype': 'application/x-mpegURL'},
                          {'file_extension': '.3gp', 'mimetype': 'video/3gpp'},
                          {'file_extension': '.mov', 'mimetype': 'video/quicktime'},
                          {'file_extension': '.avi', 'mimetype': 'video/x-msvideo'},
                          {'file_extension': '.wmv', 'mimetype': 'video/x-ms-wmv'},]

@router.get("/videos")
async def get_videos():
    import os
    return os.listdir('public/videos')


@router.get("/videos/{filename}", status_code=status.HTTP_201_CREATED)
async def get_video(filename: str):
    checked_extension = False
    for index, allow_video_extension in enumerate(allow_video_extensions):
        input_file_extension = filename[-len(
            allow_video_extension['file_extension']):]
        if input_file_extension == allow_video_extension['file_extension']:
            checked_extension = True
            break
    if not checked_extension:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='file extension not acceptable')
    try:
        with open('public/videos/' + filename, 'br') as video:
            return Response(content=video.read(), media_type=allow_video_extensions[index]['mimetype'])
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='file not found')

@router.post("/videos", status_code=status.HTTP_201_CREATED)
async def upload_video(file: UploadFile, user_dependency: UserDependency = Depends()):
    checked_extension = False
    for allow_video_extension in allow_video_extensions:
        input_file_extension = file.filename[-len(
            allow_video_extension['file_extension']):]
        if input_file_extension == allow_video_extension['file_extension']:
            checked_extension = True
            break
    if not checked_extension:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='file extension not acceptable')
    with open('public/videos/' + file.filename, 'bw') as new_video:
        new_video.write(file.file.read())
        return {"filename": file.filename}


@router.delete("/videos/{filename}", status_code=status.HTTP_410_GONE)
async def delete_video(filename: str, user_dependency: UserDependency = Depends()):
    checked_extension = False
    for allow_video_extension in allow_video_extensions:
        input_file_extension = filename[-len(
            allow_video_extension['file_extension']):]
        if input_file_extension == allow_video_extension['file_extension']:
            checked_extension = True
            break
    if not checked_extension:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='file extension not acceptable')
    import os
    if filename not in os.listdir('public/videos'):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='file not found')
    os.remove('public/videos/' + filename)
    return None