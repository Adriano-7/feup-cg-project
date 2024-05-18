attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord; // Add texture coordinates attribute

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord; // Pass texture coordinates to fragment shader

void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord; // Pass texture coordinates to fragment shader
}
