(()=>{
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
  function removeLegacySheets(){document.getElementById('viewSheet')?.remove();document.getElementById('sheetOverlay')?.remove();document.querySelectorAll('.viewSheet,.sheetOverlay').forEach(n=>n.remove())}

  const fallbackTopics=['전체','테슬라','일론머스크','TSLA주식','스페이스X','전기차','정비','튜닝','중고차','보험','블박'];
  const fallbackPosts=[
    {id:1,title:'[정비] 모델3 하이랜드 도어라이트 DIY 비용 공유',user:'송파T불빠따',rank:'r1',category:'정비',time:'1분 전',view:36,reply:7,fresh:true,thumbnail:'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=220&q=75',photos:2,video:false},
    {id:2,title:'주니퍼 통화 음질 크게 별로가요?',user:'전기차궁금',rank:'r2',category:'테슬라',time:'2분 전',view:63,reply:3,fresh:true,thumbnail:'',photos:0,video:false},
    {id:3,title:'프렁크 소프트 클로징 장착 후기입니다',user:'디젤끝물',rank:'r3',category:'튜닝',time:'3분 전',view:90,reply:8,fresh:true,thumbnail:'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=220&q=75',photos:6,video:true},
    {id:4,title:'[뻘글] 하하하 도박 중독보다 위험하네요...',user:'연비왕김대표',rank:'r5',category:'전체',time:'4분 전',view:117,reply:12,fresh:true,thumbnail:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=220&q=75',photos:8,video:false},
    {id:5,title:'[블박] 사제 블박으로 문콕을 잡을 수 있나요?',user:'캠핑짐만렙',rank:'r6',category:'블박',time:'5분 전',view:144,reply:4,fresh:true,thumbnail:'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=220&q=75',photos:2,video:false}
  ];

  function installBoard(){
    const categoryEl=document.getElementById('category');
    const listEl=document.getElementById('list');
    if(!categoryEl||!listEl)return false;

    const posts=Array.isArray(window.BOBAE_POSTS)&&window.BOBAE_POSTS.length?window.BOBAE_POSTS:fallbackPosts;
    const topics=Array.isArray(window.BOBAE_TOPICS)&&window.BOBAE_TOPICS.length?window.BOBAE_TOPICS:fallbackTopics;
    let activeIndex=0;
    let touchStart=null;

    function rankImg(p){return window.BOBAE_RANKS&&window.BOBAE_RANKS[p.rank]?'<img class="rankIcon" src="'+window.BOBAE_RANKS[p.rank]+'" alt="계급">':''}
    function filtered(){const topic=topics[activeIndex]||'전체';return topic==='전체'?posts:posts.filter(p=>p.category===topic||String(p.title||'').includes('['+topic+']'))}
    window.failThumb=function(img){const wrap=img?.closest?.('.thumbWrap');const item=img?.closest?.('.item');if(wrap)wrap.style.display='none';if(item)item.classList.add('noThumb')};

    function renderTabs(){
      categoryEl.innerHTML=topics.map((t,i)=>'<button class="cat '+(i===activeIndex?'on':'')+'" data-index="'+i+'">'+esc(t)+'</button>').join('');
      categoryEl.querySelectorAll('.cat').forEach(btn=>btn.onclick=()=>selectTopic(Number(btn.dataset.index),true));
    }

    function renderList(data=filtered()){
      listEl.innerHTML=data.map(p=>{
        const thumb=p.thumbnail?'<div class="thumbWrap"><img class="thumb" src="'+esc(p.thumbnail)+'" alt="'+esc(p.title)+' 썸네일" loading="lazy" onerror="failThumb(this)">'+(p.photos?'<span class="photoBadge">'+esc(p.photos)+'+</span>':'')+(p.video?'<span class="play"></span>':'')+'</div>':'';
        const viewText=Math.max(0,Number(p.view||0)).toLocaleString('ko-KR');
        const replyCount=Math.max(0,Number(p.reply||0));
        return '<button class="item '+(p.thumbnail?'':'noThumb')+' '+(p.fresh?'isFresh':'')+'" data-id="'+esc(p.id||1)+'"><span class="dot"></span><div class="body"><div class="itemTitle">'+esc(p.title)+'</div><div class="meta">'+rankImg(p)+'<span>'+esc(p.user)+'</span><span>'+esc(p.time)+'</span><span>조회 '+viewText+'</span></div></div>'+thumb+'<span class="commentBox"><b>'+replyCount+'</b><span>댓글</span></span></button>';
      }).join('')||'<div class="emptyList">해당 말머리 게시물이 없습니다.</div>';
    }

    function show(t){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1000)}
    function selectTopic(i,manual=false){activeIndex=Math.max(0,Math.min(i,topics.length-1));renderTabs();renderList();categoryEl.querySelector('.cat.on')?.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});if(manual)show((topics[activeIndex]||'전체')+' 선택')}
    function moveTopic(d){const next=Math.max(0,Math.min(activeIndex+d,topics.length-1));if(next!==activeIndex)selectTopic(next,true)}

    listEl.onclick=e=>{const item=e.target.closest('.item');if(item?.dataset.id)location.href='./naver-cafe-detail.html?id='+encodeURIComponent(item.dataset.id)+'&v=20260820p'};
    [listEl,categoryEl].forEach(el=>{
      el.addEventListener('touchstart',e=>{const t=e.touches[0];touchStart={x:t.clientX,y:t.clientY}},{passive:true});
      el.addEventListener('touchend',e=>{if(!touchStart||!e.changedTouches.length)return;const t=e.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.35)moveTopic(dx<0?1:-1);touchStart=null},{passive:true});
    });

    renderTabs();
    renderList();
    document.querySelector('.fab')?.addEventListener('click',()=>show('글쓰기 화면 연결 대상'));
    document.querySelector('.noticePill')?.addEventListener('click',()=>show('공지 탭'));
    document.querySelector('.boardPill')?.addEventListener('click',()=>show('통합 NEWS'));
    return true;
  }

  function installViewSheet(){
    removeLegacySheets();
    const iconMap={list:'./assets/view-list.svg?v=1',feed:'./assets/view-feed.svg?v=1',album:'./assets/view-album.svg?v=1',video:'./assets/view-video.svg?v=1'};
    const modes=[['list','목록형'],['feed','피드형'],['album','앨범형'],['video','동영상만']];
    const displayItems=[['thumbnail','썸네일 이미지'],['title','제목'],['commentBadge','댓글 배지'],['recommendCount','추천수'],['description','설명'],['tag','태그'],['highlight','하이라이트'],['rankBadge','계급 배지']];
    const state={view:'list',display:{thumbnail:true,title:true,commentBadge:true,recommendCount:false,description:false,tag:false,highlight:false,rankBadge:true},thumbnailPosition:'right'};
    const btn=document.getElementById('viewModeBtn')||document.querySelector('.gridIcon[aria-label="보기 방식"],.gridIcon[aria-label="보기 방식 선택"]');
    if(!btn)return false;
    btn.id='viewModeBtn';btn.className='gridIcon viewModeBtn';btn.setAttribute('aria-label','보기 방식 선택');btn.innerHTML='<img id="viewModeIcon" src="'+iconMap[state.view]+'" alt="보기 방식">';
    let overlay=document.getElementById('viewPopoverOverlay');
    let sheet=document.getElementById('viewPopover');
    if(!overlay){overlay=document.createElement('div');overlay.id='viewPopoverOverlay';document.body.appendChild(overlay)}
    if(!sheet){sheet=document.createElement('section');sheet.id='viewPopover';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','보기 방식 선택');document.body.appendChild(sheet)}
    overlay.onclick=close;
    sheet.onclick=e=>e.stopPropagation();

    function render(){
      sheet.innerHTML='<div class="vp-handle"></div><div class="vp-head"><button class="vp-back" type="button" aria-label="닫기">‹</button><div class="vp-head-title">보기 방식</div></div><div class="vp-title">보기 방식</div><div class="vp-group">'+modes.map(([key,label])=>'<button class="vp-option '+(state.view===key?'selected':'')+'" data-view="'+key+'"><img src="'+iconMap[key]+'" alt=""><span>'+label+'</span><span class="vp-radio '+(state.view===key?'on':'')+'"></span></button>').join('')+'</div><div class="vp-label">리스트에서 표시</div><div class="vp-group">'+displayItems.map(([key,label])=>'<button class="vp-row" data-display="'+key+'"><span class="vp-text">'+label+'</span><span class="vp-check '+(state.display[key]?'on':'')+'"></span></button>').join('')+'</div><div class="vp-label">썸네일 위치</div><div class="vp-group">'+[['right','오른쪽'],['left','왼쪽']].map(([key,label])=>'<button class="vp-row" data-pos="'+key+'"><span class="vp-text">'+label+'</span><span class="vp-radio '+(state.thumbnailPosition===key?'on':'')+'"></span></button>').join('')+'</div>';
      sheet.querySelector('.vp-back').onclick=close;
      sheet.querySelectorAll('[data-view]').forEach(el=>el.onclick=()=>{state.view=el.dataset.view;document.getElementById('viewModeIcon').src=iconMap[state.view];apply();render()});
      sheet.querySelectorAll('[data-display]').forEach(el=>el.onclick=()=>{state.display[el.dataset.display]=!state.display[el.dataset.display];apply();render()});
      sheet.querySelectorAll('[data-pos]').forEach(el=>el.onclick=()=>{state.thumbnailPosition=el.dataset.pos;apply();render()});
    }
    function apply(){
      const phone=document.getElementById('phone');
      if(!phone)return;
      ['list','feed','album','video'].forEach(v=>phone.classList.toggle('view-'+v,state.view===v));
      phone.classList.toggle('hide-thumbnail',!state.display.thumbnail);
      phone.classList.toggle('hide-title',!state.display.title);
      phone.classList.toggle('hide-commentBadge',!state.display.commentBadge);
      phone.classList.toggle('hide-rankBadge',!state.display.rankBadge);
      phone.classList.toggle('thumb-left',state.thumbnailPosition==='left');
    }
    function open(){render();apply();overlay.classList.add('open');sheet.classList.add('open');document.documentElement.style.overflow='hidden'}
    function close(){overlay.classList.remove('open');sheet.classList.remove('open');document.documentElement.style.overflow=''}
    btn.onclick=e=>{e.preventDefault();e.stopPropagation();sheet.classList.contains('open')?close():open()};
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    render();
    apply();
    return true;
  }

  function boot(){
    removeLegacySheets();
    const boardOk=installBoard();
    const sheetOk=installViewSheet();
    if(!boardOk||!sheetOk){setTimeout(()=>{installBoard();installViewSheet()},120)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();