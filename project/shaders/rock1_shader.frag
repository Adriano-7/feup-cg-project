#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 filter = texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord);

    // Define the two colors for interpolation
    vec4 color1 = vec4(0.294, 0.302, 0.278, 1.0); // #4B4D46
    vec4 color2 = vec4(0.741, 0.745, 0.733, 1.0); // #BDBEBB
    
    float t = filter.b;

    // Adjust the factor for smoother edges
    float factor = smoothstep(0.2, 1.0, t) * smoothstep(0.0, 0.5, t);

    // Calculate the distance from the center
    float distanceToCenter = length(vTextureCoord - vec2(0.5));

    // Adjust the factor based on the distance to the center
    factor *= 1.0 - distanceToCenter;

    // Interpolate between the two colors
    color = mix(color1, color2, factor);

    gl_FragColor = color;
}
