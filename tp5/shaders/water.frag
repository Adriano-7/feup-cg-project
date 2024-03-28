#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);

    vec4 color = vec4(texture2D(uSampler, vTextureCoord).rgb - filter.rgb * 0.10, 1.0);
	
    gl_FragColor = color;
}