#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform float normScale;
varying vec4 coords;


void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    offset.x = 0.3*sin(timeFactor) * normScale;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

    coords = gl_Position;
}
