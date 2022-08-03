function CreateID(length) {
  if (!length) {
    length = 10;
  }
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function ConvertFileSize(sizeInBytes) {
  // 小數點後 1 位, 無條件進位
  return (
    Math.ceil(
      (sizeInBytes / (1024 * 1024) + Number.EPSILON) * Math.pow(10, 1)
    ) / Math.pow(10, 1)
  );
}

$.fn.uploader = function (filesToUpload, sectionIdentifier) {
  var SINGLE_MAX_SIZE = 10;
  var TOTAL_MAX_SIZE = 100;

  var $uploader = $(this);
  var arrayFiles = [];

  var $empty = $uploader.find(".empty:first");
  var $add = $uploader.find(".add:first");

  var $file = $uploader.find(".file:first");
  var $box = $uploader.find(".box:first");

  var refresh = function () {
    if (arrayFiles.length > 0) {
      $empty.hide();
      $box.show();
      return;
    }

    $empty.show();
    $box.hide();
  };

  // 點擊 "選擇上傳檔案"
  $empty.on("click", function (e) {
    e.preventDefault();
    $file.click();
  });

  // 點擊 "+"
  $add.on("click", function (e) {
    e.preventDefault();
    $file.click();
  });

  $file.on("change", function (e) {
    e.preventDefault();

    for (var i = 0; i < e.target.files.length; i++) {
      var file = e.target.files[i];
      var fileID = CreateID();
      var fileSize = ConvertFileSize(file.size);
      // 單檔尺寸若大於 SINGLE_MAX_SIZE, 跳過此檔案
      if (fileSize > SINGLE_MAX_SIZE) {
        continue;
      }

      arrayFiles.push({
        id: fileID,
        file: file,
      });

      $box.append(
        `<div class="list">
          <div class="list-item list-item--name">${file.name}</div>
          <div class="list-item list-item--size">${ConvertFileSize(
            file.size
          )}MB</div>
          <div class="list-item list-item--button">
            <a class="btn-remove" href="javascript:void(0)" data-file-id="${fileID}">
              <img class="remove" src="./images/ic-x.png" alt="" />
            </a>
          </div>
        </div>`
      );
    }

    e.target.value = null;
    refresh();
  });

  $uploader.on("click", ".btn-remove", function (e) {
    e.preventDefault();
    var fileID = $(this).data("file-id");
    for (var i = 0; i < arrayFiles.length; ++i) {
      if (arrayFiles[i].id === fileID) {
        arrayFiles.splice(i, 1);
      }
    }
    $(this).parents(".list").remove();

    refresh();
  });

  this.clear = function () {
    arrayFiles = [];
    $box.empty();
  };

  this.getUploads = function () {
    return arrayFiles;
  };

  return this;
};
