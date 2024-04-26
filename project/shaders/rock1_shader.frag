#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 filter = texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord);

    // Interpolate between colors based on filter.b value
    vec4 color1 = vec4(0.294, 0.302, 0.278, 1.0); // #4B4D46
    vec4 color2 = vec4(0.392, 0.404, 0.392, 1.0); // #646764
    vec4 color3 = vec4(0.635, 0.643, 0.643, 1.0); // #A2A4A4
    vec4 color4 = vec4(0.741, 0.745, 0.733, 1.0); // #BDBEBB
    
    float t = filter.b;
    
    // Adjust the factor for smoother edges
    float factor = smoothstep(0.2, 1.0, t) * smoothstep(0.0, 0.5, t);

    // Calculate the distance from the center
    float distanceToCenter = length(vTextureCoord - vec2(0.5));

    // Adjust the factor based on the distance to the center
    factor *= 1.0 - distanceToCenter;

    color = mix(color, color1, factor);
    color = mix(color, color2, factor);
    color = mix(color, color3, factor);
    color = mix(color, color4, factor);

    gl_FragColor = color;
}
