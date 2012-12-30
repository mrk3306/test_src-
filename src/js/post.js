$(function() {

	var Post = function() {};
	Post.prototype = $.extend({}, GetListUtil.prototype, {

		init: function() {
			this._bind();
		},

		_bind: function() {
			this._check_browser();
		},

		//File APIs 対応チェック
		_check_browser: function(){

			if (window.File && window.FileReader && window.FileList && window.Blob) {
				document.getElementById('files').addEventListener('change', this._handleFileSelect, false);
			}else{
				$('#files').displayNone();
			}

		},

		//File 選択時の処理
		_handleFileSelect: function(event){
			var files = event.target.files;

			if( 1 < files.length){
				//TODO エラー処理
				alert('1ファイル選択してください');
			}else{
				var f = files[0];
				// 画像ファイルかテキスト・ファイルかを判定
				if (!f.type.match('image.*')) {
					alert("画像ファイルとテキスト・ファイル以外は表示できません。");
				}else{
					// FileReaderオブジェクトの生成
					var reader = new FileReader();
					// エラー発生時の処理
					reader.onerror = function (evt) {
						alert("読みとりに失敗しました");
					}

					var disp = $(".js-disp-img");

					// 画像ファイルの場合の処理
					if (f.type.match('image.*')) {
						// ファイル読取が完了した際に呼ばれる処理
						reader.onload = function (evt) {
							img.src = evt.target.result;
							li.innerHTML += "<br />";
							disp.appendChild(li);
						}

						// readAsDataURLメソッドでファイルの内容を取得
						reader.readAsDataURL(f);
					}
				}
			}
		}

	});

	var post = new Post();
	post.init();


});



