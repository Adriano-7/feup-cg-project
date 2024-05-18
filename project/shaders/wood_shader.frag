#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord; // Receive texture coordinates from vertex shader

uniform sampler2D uSampler; // Wood texture sampler

void main() {
    vec4 woodColor = texture2D(uSampler, vTextureCoord); // Sample wood texture
    gl_FragColor = woodColor; // Set fragment color to wood texture color
}
