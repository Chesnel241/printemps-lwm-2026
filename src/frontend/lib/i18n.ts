export type Lang = 'fr' | 'en' | 'ko' | 'zh'

export const LANG_LABELS: Record<Lang, string> = {
  fr: '🇫🇷 Français',
  en: '🇬🇧 English',
  ko: '🇰🇷 한국어',
  zh: '🇨🇳 中文',
}

export const t: Record<string, Record<Lang, string>> = {
  // ── LOGIN SCREEN ──
  'login.subtitle': {
    fr: 'Retraite de Printemps 2026',
    en: 'Spring Retreat 2026',
    ko: '2026 봄 수련회',
    zh: '2026年春季退修会',
  },
  'login.welcome': {
    fr: 'Bienvenue',
    en: 'Welcome',
    ko: '환영합니다',
    zh: '欢迎',
  },
  'login.dates': {
    fr: '4–6 avril · Centre des Pères Lazaristes',
    en: 'April 4–6 · Centre des Pères Lazaristes',
    ko: '4월 4–6일 · 라자리스트 수도원',
    zh: '4月4–6日 · 拉扎利斯特中心',
  },
  'login.namePlaceholder': {
    fr: 'Votre nom complet…',
    en: 'Your full name…',
    ko: '이름을 입력하세요…',
    zh: '请输入您的全名…',
  },
  'login.churchParis': {
    fr: 'Église Paris',
    en: 'Paris Church',
    ko: '파리 교회',
    zh: '巴黎教会',
  },
  'login.churchBourget': {
    fr: 'Église Bourget',
    en: 'Bourget Church',
    ko: '부르제 교회',
    zh: '布尔热教会',
  },
  'login.churchInvite': {
    fr: 'Invité',
    en: 'Guest',
    ko: '초대',
    zh: '嘉宾',
  },
  'login.submit': {
    fr: 'Se connecter',
    en: 'Log in',
    ko: '로그인',
    zh: '登录',
  },
  'login.loading': {
    fr: '⏳ Recherche…',
    en: '⏳ Searching…',
    ko: '⏳ 검색 중…',
    zh: '⏳ 搜索中…',
  },
  'login.errorMissing': {
    fr: 'Entrez votre nom et sélectionnez votre église.',
    en: 'Enter your name and select your church.',
    ko: '이름을 입력하고 교회를 선택하세요.',
    zh: '请输入您的姓名并选择您的教会。',
  },
  'login.errorNotFound': {
    fr: 'Participant introuvable ❌ — Vérifiez l\'orthographe et votre église.',
    en: 'Participant not found ❌ — Check your spelling and church.',
    ko: '참가자를 찾을 수 없습니다 ❌ — 이름과 교회를 확인하세요.',
    zh: '未找到参与者 ❌ — 请检查拼写和教会。',
  },

  // ── ROOM SCREEN ──
  'room.title': {
    fr: 'Votre hébergement',
    en: 'Your accommodation',
    ko: '숙소 안내',
    zh: '您的住宿',
  },
  'room.location': {
    fr: 'Centre des Pères Lazaristes · Villebon-sur-Yvette',
    en: 'Centre des Pères Lazaristes · Villebon-sur-Yvette',
    ko: '라자리스트 수도원 · Villebon-sur-Yvette',
    zh: '拉扎利斯特中心 · Villebon-sur-Yvette',
  },
  'room.noRoom': {
    fr: 'Pas de chambre disponible',
    en: 'No room available',
    ko: '배정된 방이 없습니다',
    zh: '暂无可用房间',
  },
  'room.noRoomContact': {
    fr: 'Veuillez vous rapprocher des frères ZHENG et PHIL CHESNEL',
    en: 'Please contact brothers ZHENG and PHIL CHESNEL',
    ko: 'ZHENG 형제와 PHIL CHESNEL 형제에게 문의하세요',
    zh: '请联系 ZHENG 弟兄和 PHIL CHESNEL 弟兄',
  },
  'room.goApp': {
    fr: 'Accéder à l\'application →',
    en: 'Open the application →',
    ko: '앱으로 이동 →',
    zh: '进入应用 →',
  },
  'room.room': {
    fr: 'Chambre',
    en: 'Room',
    ko: '방',
    zh: '房间',
  },

  // ── APP HEADER ──
  'app.title': {
    fr: 'Retraite Printemps 2026',
    en: 'Spring Retreat 2026',
    ko: '2026 봄 수련회',
    zh: '2026年春季退修会',
  },

  // ── TABS ──
  'tab.annonces': {
    fr: 'Annonces',
    en: 'News',
    ko: '공지',
    zh: '通知',
  },
  'tab.planning': {
    fr: 'Planning',
    en: 'Schedule',
    ko: '일정',
    zh: '日程',
  },
  'tab.plan': {
    fr: 'Plan',
    en: 'Map',
    ko: '안내',
    zh: '地图',
  },
  'tab.infos': {
    fr: 'Infos',
    en: 'Info',
    ko: '정보',
    zh: '信息',
  },
  'tab.galerie': {
    fr: 'Galerie',
    en: 'Gallery',
    ko: '갤러리',
    zh: '相册',
  },
  'tab.share': {
    fr: 'Partager',
    en: 'Share',
    ko: '공유',
    zh: '分享',
  },

  // ── COUNTDOWN ──
  'countdown.next': {
    fr: 'Prochaine session',
    en: 'Next session',
    ko: '다음 세션',
    zh: '下一场',
  },
  'countdown.ended': {
    fr: 'Retraite terminée 🙏',
    en: 'Retreat is over 🙏',
    ko: '수련회가 끝났습니다 🙏',
    zh: '退修会已结束 🙏',
  },
  'countdown.endedSub': {
    fr: 'Merci pour votre participation !',
    en: 'Thank you for your participation!',
    ko: '참여해 주셔서 감사합니다!',
    zh: '感谢您的参与！',
  },
  'countdown.hours': {
    fr: 'Heures',
    en: 'Hours',
    ko: '시간',
    zh: '小时',
  },
  'countdown.minutes': {
    fr: 'Minutes',
    en: 'Minutes',
    ko: '분',
    zh: '分钟',
  },
  'countdown.seconds': {
    fr: 'Secondes',
    en: 'Seconds',
    ko: '초',
    zh: '秒',
  },

  // ── ANNOUNCEMENTS ──
  'ann.none': {
    fr: 'Aucune annonce pour le moment',
    en: 'No announcements yet',
    ko: '아직 공지가 없습니다',
    zh: '暂无通知',
  },
  'ann.close': {
    fr: 'Fermer',
    en: 'Close',
    ko: '닫기',
    zh: '关闭',
  },

  // ── PLAN / MAP ──
  'plan.location': {
    fr: 'Votre emplacement',
    en: 'Your location',
    ko: '내 위치',
    zh: '您的位置',
  },
  'plan.roomConfirm': {
    fr: 'Chambre à confirmer',
    en: 'Room to be confirmed',
    ko: '방 확인 중',
    zh: '房间待确认',
  },
  'plan.allParticipants': {
    fr: 'Tous les participants',
    en: 'All participants',
    ko: '전체 참가자',
    zh: '所有参与者',
  },
  'plan.floor3': { fr: '2ème Étage (300)', en: '2nd Floor (300)', ko: '2층 (300)', zh: '二楼 (300)' },
  'plan.floor2': { fr: '1er Étage (200)', en: '1st Floor (200)', ko: '1층 (200)', zh: '一楼 (200)' },
  'plan.floor1': { fr: 'Rez-de-chaussée (100)', en: 'Ground Floor (100)', ko: '지상층 (100)', zh: '地面层 (100)' },
  'plan.floor0': { fr: 'Niveau Bas (L000)', en: 'Lower Level (L000)', ko: '지하층 (L000)', zh: '地库层 (L000)' },

  // ── INFOS ──
  'info.rules.title': {
    fr: 'Règles de vie',
    en: 'House rules',
    ko: '생활 규칙',
    zh: '生活规则',
  },
  'info.rules.body': {
    fr: 'Merci de respecter le calme après 22h00 dans les couloirs.\n\nLes repas sont servis aux horaires indiqués dans le planning. Merci de respecter les horaires pour le bien de tous.',
    en: 'Please keep quiet after 10 PM in the hallways.\n\nMeals are served at the times shown in the schedule. Please respect the timetable for everyone\'s benefit.',
    ko: '복도에서 밤 10시 이후에는 조용히 해주세요.\n\n식사는 일정에 표시된 시간에 제공됩니다. 모두를 위해 시간을 지켜주세요.',
    zh: '晚上10点后请在走廊保持安静。\n\n用餐按日程安排的时间供应，请遵守时间表。',
  },
  'info.key.title': {
    fr: 'Sécurité & objets de valeur',
    en: 'Safety & valuables',
    ko: '안전 및 귀중품',
    zh: '安全与贵重物品',
  },
  'info.key.body': {
    fr: '⚠️ Les chambres ne disposent pas de clé.\n\nMerci de bien conserver vos objets de valeur (téléphone, portefeuille, documents) sur vous ou dans vos bagages.\n\nL\'organisation décline toute responsabilité en cas de perte ou de vol.',
    en: '⚠️ The rooms do not have keys.\n\nPlease keep your valuables (phone, wallet, documents) with you or in your luggage at all times.\n\nThe organizers cannot be held responsible for any loss or theft.',
    ko: '⚠️ 방에는 열쇠가 없습니다.\n\n귀중품(휴대폰, 지갑, 서류)은 항상 소지하시거나 가방에 보관해 주세요.\n\n분실이나 도난에 대해 주최 측은 책임지지 않습니다.',
    zh: '⚠️ 房间没有钥匙。\n\n请随身携带贵重物品（手机、钱包、证件）或放在行李中。\n\n主办方对任何丢失或被盗不承担责任。',
  },
  'info.lieu.title': {
    fr: 'Lieu',
    en: 'Location',
    ko: '장소',
    zh: '地点',
  },
  'info.lieu.body': {
    fr: 'Centre de retraites des Pères Lazaristes\nVillebon-sur-Yvette, Île-de-France\n\nConsultez l\'onglet Plan pour localiser votre chambre.',
    en: 'Retreat Center of the Lazarist Fathers\nVillebon-sur-Yvette, Île-de-France\n\nCheck the Map tab to locate your room.',
    ko: '라자리스트 수도원 퇴수원\nVillebon-sur-Yvette, Île-de-France\n\n안내 탭에서 방 위치를 확인하세요.',
    zh: '拉扎利斯特神父退修中心\nVillebon-sur-Yvette, 法兰西岛\n\n请查看地图选项卡以找到您的房间。',
  },
  'info.dates.title': {
    fr: 'Dates',
    en: 'Dates',
    ko: '일정',
    zh: '日期',
  },
  'info.dates.body': {
    fr: 'Arrivée : Samedi 4 avril — Entrée à Villebon dès 14h00\nClôture : Lundi 6 avril à 12h30 (après le déjeuner)\n\nLe programme détaillé est disponible dans l\'onglet Planning.',
    en: 'Arrival: Saturday April 4 — Entry at Villebon from 2:00 PM\nClosing: Monday April 6 at 12:30 PM (after lunch)\n\nThe detailed program is available in the Schedule tab.',
    ko: '도착: 4월 4일 토요일 — 빌르봉 입장 오후 2시\n폐회: 4월 6일 월요일 오후 12시 30분 (점심 후)\n\n자세한 일정은 일정 탭에서 확인하세요.',
    zh: '到达：4月4日星期六 — 下午2时进入维勒邦\n闭幕：4月6日星期一下午12:30（午餐后）\n\n详细日程请查看日程选项卡。',
  },

  // ── ADMIN ──
  'admin.title': {
    fr: 'Interface Admin',
    en: 'Admin Panel',
    ko: '관리자 설정',
    zh: '管理面板',
  },
  'admin.subtitle': {
    fr: 'Retraite Printemps 2026 · 4–6 avril',
    en: 'Spring Retreat 2026 · April 4–6',
    ko: '2026 봄 수련회 · 4월 4–6일',
    zh: '2026年春季退修会 · 4月4–6日',
  },
  'admin.back': {
    fr: '← Retour',
    en: '← Back',
    ko: '← 돌아가기',
    zh: '← 返回',
  },
  'admin.registered': {
    fr: 'Inscrits',
    en: 'Registered',
    ko: '등록',
    zh: '已注册',
  },
  'admin.roomsOk': {
    fr: 'Chambres OK',
    en: 'Rooms OK',
    ko: '방 확인',
    zh: '房间已确认',
  },
  'admin.pending': {
    fr: 'À confirmer',
    en: 'Pending',
    ko: '미확인',
    zh: '待确认',
  },
  'admin.publish': {
    fr: 'Publier une annonce',
    en: 'Publish an announcement',
    ko: '공지 작성',
    zh: '发布通知',
  },
  'admin.titlePlaceholder': {
    fr: 'Titre de l\'annonce…',
    en: 'Announcement title…',
    ko: '공지 제목…',
    zh: '通知标题…',
  },
  'admin.bodyPlaceholder': {
    fr: 'Votre message…',
    en: 'Your message…',
    ko: '메시지를 입력하세요…',
    zh: '请输入消息…',
  },
  'admin.send': {
    fr: '📣 Envoyer & Notifier',
    en: '📣 Send & Notify',
    ko: '📣 전송 & 알림',
    zh: '📣 发送并通知',
  },
  'admin.sending': {
    fr: '⏳ Envoi…',
    en: '⏳ Sending…',
    ko: '⏳ 전송 중…',
    zh: '⏳ 发送中…',
  },
  'admin.sent': {
    fr: 'Annonce publiée !',
    en: 'Announcement published!',
    ko: '공지가 게시되었습니다!',
    zh: '通知已发布！',
  },
  'admin.notified': {
    fr: 'participants notifiés',
    en: 'participants notified',
    ko: '명에게 알림 전송',
    zh: '位参与者已收到通知',
  },
  'admin.newAnn': {
    fr: 'Nouvelle annonce',
    en: 'New announcement',
    ko: '새 공지',
    zh: '新通知',
  },
  'admin.participants': {
    fr: 'Participants',
    en: 'Participants',
    ko: '참가자',
    zh: '参与者',
  },
  'admin.allParticipants': {
    fr: '🌍 Tous les participants',
    en: '🌍 All participants',
    ko: '🌍 전체 참가자',
    zh: '🌍 所有参与者',
  },

  // ── PLANNING DAYS ──
  'planning.sat': {
    fr: 'Samedi 4 avril',
    en: 'Saturday April 4',
    ko: '4월 4일 토요일',
    zh: '4月4日 星期六',
  },
  'planning.sun': {
    fr: 'Dimanche 5 avril',
    en: 'Sunday April 5',
    ko: '4월 5일 일요일',
    zh: '4月5日 星期日',
  },
  'planning.mon': {
    fr: 'Lundi 6 avril',
    en: 'Monday April 6',
    ko: '4월 6일 월요일',
    zh: '4月6日 星期一',
  },

  // ── TOAST ──
  'toast.header': {
    fr: 'Retraite · Printemps 2026',
    en: 'Retreat · Spring 2026',
    ko: '수련회 · 2026 봄',
    zh: '退修会 · 2026年春',
  },

  // ── GALLERY ──
  'gallery.title': {
    fr: 'Galerie Souvenirs',
    en: 'Memory Gallery',
    ko: '추억 갤러리',
    zh: '回忆相册',
  },
  'gallery.add': {
    fr: 'Ajouter',
    en: 'Add',
    ko: '추가',
    zh: '添加',
  },
  'gallery.uploading': {
    fr: 'Envoi...',
    en: 'Uploading...',
    ko: '업로드 중...',
    zh: '正在上传...',
  },
  'gallery.none': {
    fr: 'Aucune photo pour le moment. Soyez le premier à en partager une !',
    en: 'No photos yet. Be the first to share one!',
    ko: '아직 사진이 없습니다. 첫 번째 사진을 공유해 보세요!',
    zh: '目前没有照片。成为第一个分享的人吧！',
  },

  // ── SHARE ──
  'share.title': {
    fr: 'Partager l\'application',
    en: 'Share the app',
    ko: '앱 공유하기',
    zh: '分享应用',
  },
  'share.subtitle': {
    fr: 'Scannez ce code pour accéder instantanément à l\'application de la retraite.',
    en: 'Scan this code to instantly access the retreat app.',
    ko: '이 코드를 스캔하여 수련회 앱에 즉시 접속하세요.',
    zh: '扫描此代码即可立即访问退修会应用。',
  },
  'share.link': {
    fr: 'Copier le lien',
    en: 'Copy link',
    ko: '링크 복사',
    zh: '复制链接',
  },
  'share.copied': {
    fr: 'Lien copié dans le presse-papier !',
    en: 'Link copied to clipboard!',
    ko: '링크가 클립보드에 복사되었습니다!',
    zh: '链接已复制到剪贴板！',
  },
}

export function tr(key: string, lang: Lang): string {
  return t[key]?.[lang] || t[key]?.['fr'] || key
}
