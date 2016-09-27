$(function() {
	// 初期化
	(function() {
		var canvas = document.getElementById('canvas');

		HAL.gl = canvas.getContext('webgl');

		HAL.gl.viewport(0, 0, canvas.width, canvas.height);

		HAL.gl.clearColor(1, 1, 1, 1);
	}());

	// シェーダが正しくコンパイルされたかチェックする
	var CheckCompile = function(shader) {
		if(!(HAL.gl.getShaderParameter(shader, HAL.gl.COMPILE_STATUS))) {
			// 失敗していたらエラーログをアラートする
			console.error(HAL.gl.getShaderInfoLog(shader));
		}

		return;
	};

	// シェーダを書く
	(function() {
		// 頂点シェーダ
		var vs = "";
		vs += "attribute vec4 coords;";
		vs += "void main(void) {";
		vs += "  gl_Position  = coords;";
		vs += "}";

		var vertexShader = HAL.gl.createShader(HAL.gl.VERTEX_SHADER);
		HAL.gl.shaderSource(vertexShader, vs);
		HAL.gl.compileShader(vertexShader);
		CheckCompile(vertexShader);

		// フラグメントシェーダ
		var fs = "";
		fs += "precision mediump float;";
		fs += "void main(void) {";
		fs += "  vec2  pos1   = (gl_FragCoord.xy * 2.0 - vec2(640.0)) / 640.0;";           // [-1, 1]への正規化
		fs += "  vec2  pos2   = (vec2(1.0) + pos1.xy) / 2.0;";                             // [ 0, 1]への正規化
		fs += "  float dist   = sqrt((pos1.x * pos1.x) + (pos1.y * pos1.y)) / sqrt(2.0);"; // 中心からの距離（[0, 1]への正規化済）
		fs += "  float sine   = (sin(dist * 8.0 * 3.14) + 1.0) / 2.0;"
		fs += "  gl_FragColor = vec4(sine, sine, sine, 1.0);";
		fs += "}";

		var fragmentShader = HAL.gl.createShader(HAL.gl.FRAGMENT_SHADER);
		HAL.gl.shaderSource(fragmentShader, fs);
		HAL.gl.compileShader(fragmentShader);
		CheckCompile(fragmentShader);

		// 一つのプログラムにまとめる
		HAL.shaderProgram = HAL.gl.createProgram();
		HAL.gl.attachShader(HAL.shaderProgram, vertexShader);
		HAL.gl.attachShader(HAL.shaderProgram, fragmentShader);
		HAL.gl.linkProgram(HAL.shaderProgram);
		HAL.gl.useProgram(HAL.shaderProgram);
	}());

	// 頂点データの作成
	(function() {
		// 頂点配列
		HAL.vertexArray = [
			-0.90, -0.78, 0.00,
			 0.90, -0.78, 0.00,
			 0.00,  0.78, 0.00
		];

		// WebGLの配列にデータ転送
		var buffer = HAL.gl.createBuffer();
		HAL.gl.bindBuffer(HAL.gl.ARRAY_BUFFER, buffer);
		HAL.gl.bufferData(HAL.gl.ARRAY_BUFFER, new Float32Array(HAL.vertexArray), HAL.gl.STATIC_DRAW);

		// シェーダ内変数で利用できるようにする
		var coords = HAL.gl.getAttribLocation(HAL.shaderProgram, "coords");
		HAL.gl.vertexAttribPointer(coords, 3, HAL.gl.FLOAT, false, 0, 0);
		HAL.gl.enableVertexAttribArray(coords);
		HAL.gl.bindBuffer(HAL.gl.ARRAY_BUFFER, null);
	}());

	// 描画
	(function() {
		HAL.gl.clear(HAL.gl.COLOR_BUFFER_BIT);
		HAL.gl.drawArrays(HAL.gl.TRIANGLES, 0, 3);
	}());
});

