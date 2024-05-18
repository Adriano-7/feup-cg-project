attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    
    vTextureCoord = aTextureCoord;

    // Sample the second texture to determine offset
    vec4 filter = texture2D(uSampler2, vTextureCoord);
    if (filter.b > 0.5) {
        // Apply deformation based on vertex normal
        offset = aVertexNormal * normScale * 0.1;
    }

    vec3 deformedPosition = aVertexPosition + offset;

    // Simplified deformation to mimic rock-like shapes
    float deformation1 = sin(deformedPosition.x * 10.0) * cos(deformedPosition.y * 10.0) * 0.1;
    float deformation2 = sin(deformedPosition.y * 15.0) * cos(deformedPosition.z * 15.0) * 0.05;

    deformedPosition += aVertexNormal * (deformation1 + deformation2);

    gl_Position = uPMatrix * uMVMatrix * vec4(deformedPosition, 1.0);
}
