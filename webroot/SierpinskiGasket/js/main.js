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
		fs += "  bool  flag1[642];";
		fs += "  bool  flag2[642];";
		fs += "  bool  isOddStep = true;";
		fs += "  for (int i = 0; i < 642; i++)";
		fs += "  {";
		fs += "    if (i == 321)";
		fs += "    {";
		fs += "      flag1[i] = true;";
		fs += "    }";
		fs += "    else";
		fs += "    {";
		fs += "      flag1[i] = false;";
		fs += "    }";
		fs += "  }";
		fs += "  for (int i = 0; i < 100; i++)";
		fs += "  {";
		fs += "    if (isOddStep)";
		fs += "    {";
		fs += "      for (int x = 160; x < 480; x++)";
		fs += "      {";
		fs += "        if (flag1[x-1] == false && flag1[x] == false && flag1[x+1] == false)";      // [0 0 0] -> 0
		fs += "        {";
		fs += "          flag2[x] = false;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == false && flag1[x] == false && flag1[x+1] == true)";  // [0 0 1] -> 1
		fs += "        {";
		fs += "          flag2[x] = true;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == false && flag1[x] == true && flag1[x+1] == false)";  // [0 1 0] -> 0
		fs += "        {";
		fs += "          flag2[x] = false;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == false && flag1[x] == true && flag1[x+1] == true)";   // [0 1 1] -> 1
		fs += "        {";
		fs += "          flag2[x] = true;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == true && flag1[x] == false && flag1[x+1] == false)";  // [1 0 0] -> 1
		fs += "        {";
		fs += "          flag2[x] = true;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == true && flag1[x] == false && flag1[x+1] == true)";   // [1 0 1] -> 0
		fs += "        {";
		fs += "          flag2[x] = false;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == true && flag1[x] == true && flag1[x+1] == false)";   // [1 1 0] -> 1
		fs += "        {";
		fs += "          flag2[x] = true;";
		fs += "        }";
		fs += "        else if (flag1[x-1] == true && flag1[x] == true && flag1[x+1] == true)";    // [1 1 1] -> 0
		fs += "        {";
		fs += "          flag2[x] = false;";
		fs += "        }";
		fs += "      }";
		fs += "    }";
		fs += "    else";
		fs += "    {";
		fs += "      for (int x = 160; x < 480; x++)";
		fs += "      {";
		fs += "        if (flag2[x-1] == false && flag2[x] == false && flag2[x+1] == false)";      // [0 0 0] -> 0
		fs += "        {";
		fs += "          flag1[x] = false;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == false && flag2[x] == false && flag2[x+1] == true)";  // [0 0 1] -> 1
		fs += "        {";
		fs += "          flag1[x] = true;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == false && flag2[x] == true && flag2[x+1] == false)";  // [0 1 0] -> 0
		fs += "        {";
		fs += "          flag1[x] = false;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == false && flag2[x] == true && flag2[x+1] == true)";   // [0 1 1] -> 1
		fs += "        {";
		fs += "          flag1[x] = true;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == true && flag2[x] == false && flag2[x+1] == false)";  // [1 0 0] -> 1
		fs += "        {";
		fs += "          flag1[x] = true;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == true && flag2[x] == false && flag2[x+1] == true)";   // [1 0 1] -> 0
		fs += "        {";
		fs += "          flag1[x] = false;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == true && flag2[x] == true && flag2[x+1] == false)";   // [1 1 0] -> 1
		fs += "        {";
		fs += "          flag1[x] = true;";
		fs += "        }";
		fs += "        else if (flag2[x-1] == true && flag2[x] == true && flag2[x+1] == true)";    // [1 1 1] -> 0
		fs += "        {";
		fs += "          flag1[x] = false;";
		fs += "        }";
		fs += "      }";
		fs += "    }";
		fs += "    if (i > int(gl_FragCoord.y))";
		fs += "    {";
		fs += "      break;";
		fs += "    }";
		fs += "    ";
		fs += "    isOddStep = !(isOddStep);";
		fs += "    ";
		fs += "  }";
		fs += "  for (int i = 0; i < 640; i++)";
		fs += "  {";
		fs += "    if (i == int(gl_FragCoord.x))";
		fs += "    {";
		fs += "      if (isOddStep ? flag2[i] : flag1[i])";
		fs += "      {";
		fs += "        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);";
		fs += "      }";
		fs += "      else";
		fs += "      {";
		fs += "        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);";
		fs += "      }";
		fs += "      break;";
		fs += "    }";
		fs += "  }";
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
			-1.00,  1.00, 0.00,
			-1.00, -1.00, 0.00,
			 1.00,  1.00, 0.00,
			 1.00, -1.00, 0.00
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
		HAL.gl.drawArrays(HAL.gl.TRIANGLE_STRIP, 0, 4);
	}());
});

