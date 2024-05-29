# Cyli

An inexpensive cylindrical display for 360° video.

## Converting Video

Most video is 360° video is stored in equirectangular format. This is a 2:1 aspect ratio image that wraps around the viewer. To convert this to the `little planet` (a specific stereographic projection), it is necessary to convert the video using this ffmpeg filter:

`"v360=input=e:output=sg:h_fov=300:v_fov=300:w=2048:h=2048:pitch=-90"`

## building the display

The display is simply built using flexible mirror material (e.g., `some examples`) that is wrapped around a 3D printed central hub. The files for the hub are available in the `todo: add folder` folder.
