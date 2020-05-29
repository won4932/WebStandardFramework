window.onscroll = function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  var tabmenu = document.getElementsByName("content-tabmenu")[0];
  //tabmenu.offsetTop
  var tabmenuFixed = document.getElementsByName("content-tabmenu-fixed")[0];

  if(scrollTop > tabmenu.offsetTop)
  {
    // 탭 메뉴(고정) 보이기
    tabmenuFixed.style.display="block";
  }
  else
  {
    // 탭 메뉴(고정) 감추기
    tabmenuFixed.style.display="none";
  }
};

var IS_PC = false;

// 도큐먼트 로드 함수 (onload)
function loadDocument()
{
  resizeDocument(); // 도큐먼트 리사이즈
}

// 도큐먼트 리사이즈(onResize)
function resizeDocument()
{
  var document_w = parseInt(window.innerWidth) || parseInt(document.body.clientWidth); // - 브라우저 width 값
  if(document_w >= 750)
  {
    // width 750 px 이상인 경우 - PC
    IS_PC = true;
  }
  else
  {
    // width 750 px 미만인 경우 - SP
    IS_PC = false;
  }
}

// 검색 토글(Search Toggle)
function onToggleSearch()
{
  var target = document.getElementsByName("head-list-option-searchtoggle")[0];
  if(target.length == 0) return;

  if(IS_PC)
  {
    if(target.style.display === "block")  target.style.display = "none";
    else target.style.display = "block";
  }
  else
  {
    alert("Input search keyword (mobile version)");
  }
}

// 스크린 네비게이션 선택
function onSelectScreenNavi(target, no)
{
  if(getElementClass(target, "ac")) return; // 이미 선택된 경우

  var list = document.getElementsByName("content-list-screennavi-pt")[0];
  if(list.length == 0) return;

  // 이전 선택된 네비게이션 버튼 초기화
  var items = list.children;
  if(items.length == 0) return;
  for(var i =0; i < items.length; i++ )
  {
    var item = items[i];
    var pt = item.children[0];
    if(!getElementClass(pt, "ac"))  continue;

    removeElementClass(pt, "ac"); // - ac 클래스 삭제
    break;
  }

  addElementClass(target, "ac"); // - ac 클래스 추가

  // 이미지 변경
  list = document.getElementsByName("content-list-screennavi-img")[0];
  if(list.length == 0) return;

  // 이전 선택된 네비게이션 버튼 초기화
  items = list.children;
  if(items.length == 0 || no > items.length) return;

  item = items[no];

  var scroll_left = item.offsetLeft;

  list = list.parentElement; // - box 선택
  list.scrollLeft = scroll_left;
}

// jquery.hasClass() / addClass() / removeClass() - javascript 구현
function getElementClass(target, classname)
{
  var filter = new RegExp("(\\s|^)" + classname + "(\\s|$)");
  if(filter.test(target.className)) return true;
  else return false;
}
function addElementClass(target, classname)
{
  target.className += " " + classname;
}
function removeElementClass(target, classname)
{
  var filter = new RegExp("(\\s|^)" + classname + "(\\s|$)");
  target.className = target.className.replace(filter, " ").trim();
}
