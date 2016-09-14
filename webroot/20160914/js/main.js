$(function() {
	// 初期化
	(function() {
		var canvas = document.getElementById('canvas');

		HAL.gl = canvas.getContext('webgl');

		HAL.gl.viewport(0, 0, canvas.width, canvas.height);

		HAL.gl.clearColor(0, 0, 1, 1);
	}());

	// 描画
	(function() {
		HAL.gl.clear(HAL.gl.COLOR_BUFFER_BIT);
	}());
});

