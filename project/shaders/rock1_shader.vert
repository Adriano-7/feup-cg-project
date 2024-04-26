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
    vec4 filter = texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord);
    if (filter.b > 0.5) {
        // Apply deformation based on vertex normal
        offset = aVertexNormal * normScale * 0.1;
    }

    // Apply offset to vertex position for deformation
    vec3 deformedPosition = aVertexPosition + offset;

    // Apply additional deformation for a more rocky appearance
    // You can experiment with different functions to achieve desired results
    float deformation = sin(deformedPosition.x * 5.0) * cos(deformedPosition.y * 5.0) * 0.1;
    deformedPosition += aVertexNormal * deformation;

    // Transform the deformed position
    gl_Position = uPMatrix * uMVMatrix * vec4(deformedPosition, 1.0);
}
