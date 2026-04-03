import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PARTS = [
  {"no":1,"nom":"Lee Sewoong","church":"paris","chambre":"100"},
  {"no":2,"nom":"Byeon Donghwa","church":"paris","chambre":"100"},
  {"no":3,"nom":"Lee Seunghui","church":"paris","chambre":"200"},
  {"no":4,"nom":"Lee Hyunhui","church":"paris","chambre":"200"},
  {"no":5,"nom":"Zheng Zhehao","church":"paris","chambre":"103"},
  {"no":6,"nom":"Jin Hua","church":"paris","chambre":"103"},
  {"no":7,"nom":"Zheng Lydia","church":"paris","chambre":"103"},
  {"no":8,"nom":"Ko Eunbi","church":"paris","chambre":"202"},
  {"no":9,"nom":"Ko Danbi","church":"paris","chambre":"202"},
  {"no":10,"nom":"Kim KiYeong","church":"paris","chambre":null},
  {"no":11,"nom":"Kim SuHyun","church":"paris","chambre":null},
  {"no":12,"nom":"Kim Anaïs","church":"paris","chambre":null},
  {"no":13,"nom":"Kim Victor","church":"paris","chambre":null},
  {"no":14,"nom":"Jiang Zhi","church":"paris","chambre":"102"},
  {"no":15,"nom":"Xu Mingyang","church":"paris","chambre":"102"},
  {"no":16,"nom":"Jiang Noé","church":"paris","chambre":"102"},
  {"no":17,"nom":"Nguyen Charlie","church":"paris","chambre":"104"},
  {"no":18,"nom":"Leblanc Maxime","church":"invite","chambre":"104"},
  {"no":19,"nom":"Guo Zhenyi","church":"paris","chambre":"307"},
  {"no":20,"nom":"Micos Thibaut","church":"paris","chambre":"307"},
  {"no":21,"nom":"Marialva Brian","church":"paris","chambre":"307"},
  {"no":22,"nom":"Zheng Samuel","church":"paris","chambre":"307"},
  {"no":23,"nom":"Ko Sichan","church":"paris","chambre":null},
  {"no":24,"nom":"Kim Taesun","church":"paris","chambre":null},
  {"no":25,"nom":"Boulangé Pascale","church":"invite","chambre":null},
  {"no":26,"nom":"Danielle","church":"invite","chambre":null},
  {"no":27,"nom":"Rina","church":"invite","chambre":"203"},
  {"no":28,"nom":"Kwon Marie","church":"paris","chambre":"203"},
  {"no":29,"nom":"Guibert Manon","church":"paris","chambre":"309"},
  {"no":30,"nom":"Camus Mathilde","church":"paris","chambre":"309"},
  {"no":31,"nom":"Avisse Gabrielle","church":"paris","chambre":"309"},
  {"no":32,"nom":"Torres Alec","church":"paris","chambre":"309"},
  {"no":33,"nom":"Davaajav Ogie","church":"paris","chambre":"311"},
  {"no":34,"nom":"Davaajav Urnaa","church":"paris","chambre":"311"},
  {"no":35,"nom":"Miokey Oyuka","church":"paris","chambre":"311"},
  {"no":36,"nom":"Ethel","church":"invite","chambre":"311"},
  {"no":37,"nom":"Nani","church":"invite","chambre":"204"},
  {"no":38,"nom":"Judor Layana","church":"paris","chambre":"204"},
  {"no":39,"nom":"Jung, Jong Ah","church":"paris","chambre":"207"},
  {"no":40,"nom":"Mosse, Armand","church":"paris","chambre":"207"},
  {"no":41,"nom":"Mosse, Arton","church":"paris","chambre":"207"},
  {"no":42,"nom":"Labady Pépita","church":"invite","chambre":"302"},
  {"no":43,"nom":"Labady Kiera","church":"paris","chambre":"302"},
  {"no":44,"nom":"Labady Noëlla","church":"invite","chambre":"302"},
  {"no":45,"nom":"Labady Eliel","church":"invite","chambre":"302"},
  {"no":46,"nom":"KIM Hyunsuk","church":"paris","chambre":"101"},
  {"no":47,"nom":"CHOI Daeun","church":"paris","chambre":"101"},
  {"no":48,"nom":"KIM Ian","church":"paris","chambre":"101"},
  {"no":49,"nom":"Baik Jaehyun","church":"paris","chambre":null},
  {"no":50,"nom":"Kim Kyungsun","church":"paris","chambre":null},
  {"no":51,"nom":"Baik Léa","church":"paris","chambre":null},
  {"no":52,"nom":"Baik Léo","church":"paris","chambre":null},
  {"no":53,"nom":"OH SEIL","church":"paris","chambre":"109"},
  {"no":54,"nom":"JEONG HAGYU","church":"paris","chambre":"109"},
  {"no":55,"nom":"LEE SEONGYEONG","church":"paris","chambre":"109"},
  {"no":56,"nom":"KIM SEONGEUN","church":"paris","chambre":"211"},
  {"no":57,"nom":"KWON CHUNGSHIN","church":"paris","chambre":"211"},
  {"no":58,"nom":"HA YEJIN","church":"paris","chambre":"210"},
  {"no":59,"nom":"YOON BONGSUK","church":"paris","chambre":"210"},
  {"no":60,"nom":"SONG MYUNGKYU","church":"paris","chambre":"111"},
  {"no":61,"nom":"Ko Daniel","church":"paris","chambre":"111"},
  {"no":62,"nom":"CHOI JIYUN","church":"paris","chambre":"209"},
  {"no":63,"nom":"HAN SUJIN","church":"paris","chambre":"209"},
  {"no":64,"nom":"Kim Yeeseul","church":"paris","chambre":"209"},
  {"no":65,"nom":"JEONG SEMIN","church":"paris","chambre":"208"},
  {"no":66,"nom":"KIM DAIN","church":"invite","chambre":"208"},
  {"no":67,"nom":"Mme. Montresor","church":"invite","chambre":null},
  {"no":68,"nom":"Judde Montresor Boris","church":"invite","chambre":null},
  {"no":69,"nom":"Sheryl","church":"paris","chambre":"310"},
  {"no":70,"nom":"Loren Jean Fernandez","church":"invite","chambre":"310"},
  {"no":71,"nom":"Grace","church":"paris","chambre":"310"},
  {"no":72,"nom":"Elias A.","church":"bourget","chambre":"109b"},
  {"no":73,"nom":"Jérèd DZOBEMVAME MABOUNDAM","church":"bourget","chambre":"109b"},
  {"no":74,"nom":"Ruth Togbonou","church":"bourget","chambre":"304"},
  {"no":75,"nom":"Joël (guest)","church":"invite","chambre":"304"},
  {"no":76,"nom":"Gabriella Evodie","church":"bourget","chambre":"304"},
  {"no":77,"nom":"Leslie Delacote","church":"bourget","chambre":"304"},
  {"no":78,"nom":"Hermann.Y","church":"bourget","chambre":"2"},
  {"no":79,"nom":"Nathalie","church":"bourget","chambre":"205"},
  {"no":80,"nom":"Divine Remadji N.","church":"bourget","chambre":"205"},
  {"no":81,"nom":"Gaspard B.","church":"bourget","chambre":"L002"},
  {"no":82,"nom":"Suzanne Bassong","church":"bourget","chambre":"L002"},
  {"no":83,"nom":"Kevin Wandji","church":"bourget","chambre":"107"},
  {"no":84,"nom":"Raphaela Wandji","church":"bourget","chambre":"107"},
  {"no":85,"nom":"Brenda N.","church":"bourget","chambre":"306"},
  {"no":86,"nom":"Kecia N A","church":"bourget","chambre":"306"},
  {"no":87,"nom":"Grace L.","church":"bourget","chambre":"306"},
  {"no":88,"nom":"Queen Kombil","church":"bourget","chambre":"306"},
  {"no":89,"nom":"Cindy Dikongue","church":"bourget","chambre":"306"},
  {"no":90,"nom":"Régina Azonkeu","church":"bourget","chambre":"L003"},
  {"no":91,"nom":"Armelle (guest)","church":"invite","chambre":"L003"},
  {"no":92,"nom":"Messima","church":"bourget","chambre":"308"},
  {"no":93,"nom":"MOSAYANE","church":"bourget","chambre":"308"},
  {"no":94,"nom":"Patricia Tatsinkou","church":"bourget","chambre":"308"},
  {"no":95,"nom":"Letitia Moguem","church":"bourget","chambre":"308"},
  {"no":96,"nom":"DyVan ING","church":"bourget","chambre":"301"},
  {"no":97,"nom":"Naomi ING","church":"bourget","chambre":"301"},
  {"no":98,"nom":"Kyria ING","church":"bourget","chambre":"301"},
  {"no":99,"nom":"Évangéline Itoua","church":"bourget","chambre":"301"},
  {"no":100,"nom":"Germaine Ayawa + 2 children","church":"bourget","chambre":"L004"},
  {"no":101,"nom":"Gabrielle Bayonne","church":"bourget","chambre":"312"},
  {"no":102,"nom":"Ridie (guest)","church":"invite","chambre":"312"},
  {"no":103,"nom":"Arianna (guest)","church":"invite","chambre":"312"},
  {"no":104,"nom":"Phil Chesnel.E","church":"bourget","chambre":"L005"},
  {"no":105,"nom":"Michael Bessita","church":"invite","chambre":"105"},
  {"no":106,"nom":"Soogabbe Japhet","church":"bourget","chambre":"105"},
  {"no":107,"nom":"Jores Ekeani","church":"bourget","chambre":"300"},
  {"no":108,"nom":"Yvan Wonders","church":"bourget","chambre":"300"},
  {"no":109,"nom":"Mark TALANTSI","church":"bourget","chambre":"300"},
  {"no":110,"nom":"Greg Freddy","church":"bourget","chambre":"300"},
  {"no":111,"nom":"Joe Pallaye","church":"bourget","chambre":"303"},
  {"no":112,"nom":"AHOUETOGNON Martin","church":"bourget","chambre":"303"},
  {"no":113,"nom":"Kombou Hector","church":"bourget","chambre":"303"},
  {"no":114,"nom":"Didier N.","church":"bourget","chambre":"303"},
  {"no":115,"nom":"Wafo Kamga Steve Biko","church":"invite","chambre":"108"},
  {"no":116,"nom":"Yovo Emmanuel","church":"bourget","chambre":"108"},
  {"no":117,"nom":"Norlaine Oriane","church":"bourget","chambre":"201"},
  {"no":118,"nom":"DJONYABE Habiba Rachel","church":"bourget","chambre":"201"},
  {"no":119,"nom":"Flordy Loubayi","church":"bourget","chambre":"206"},
  {"no":120,"nom":"Lolita","church":"bourget","chambre":"206"},
  {"no":121,"nom":"Reine K.","church":"bourget","chambre":"212"},
  {"no":122,"nom":"Diane Ebozoa","church":"bourget","chambre":"212"},
  {"no":123,"nom":"Pierre Fleury Atangana","church":"bourget","chambre":"212"},
  {"no":124,"nom":"Guy Tawokam","church":"bourget","chambre":"106"},
  {"no":125,"nom":"Alice Tawokam","church":"bourget","chambre":"106"},
  {"no":126,"nom":"Léon NGUEMA","church":"invite","chambre":"L005"},
  {"no":127,"nom":"Parker Oyane","church":"bourget","chambre":"L001"},
  {"no":128,"nom":"Carole JIM","church":"bourget","chambre":"L001"}
];

async function main() {
  console.log('Start seeding...')
  for (const p of PARTS) {
    await prisma.participant.upsert({
      where: { num: p.no },
      update: {},
      create: {
        num: p.no,
        name: p.nom,
        church: p.church,
        room: p.chambre
      }
    })
  }

  await prisma.announcement.create({
    data: {
      title: 'Bienvenue à la Retraite de Printemps 2026 !',
      body: 'Nous sommes heureux de vous accueillir au Centre des Pères Lazaristes de Villebon-sur-Yvette.\n\nQue ces 3 jours (4–6 avril) soient un temps de grâce, de ressourcement et de renouvellement spirituel pour chacun d\'entre vous.\n\nQue Dieu soit au centre de chaque moment ! 🙏',
      type: 'info',
      audience: 'tous'
    }
  })
  
  console.log('Seeding finished.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
