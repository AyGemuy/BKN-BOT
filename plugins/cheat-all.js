let handler = async (m, { conn, args }) => {
  let x = 1.797693134862315e308;
  let y = x * 1.001;
  let am = args ? (args[0] == "default" ? 399898897600101000 : args[0]) : y;
  let data = (db.data.users[m.sender] = {
    ...db.data.users[m.sender],
    limit: am,
    money: am,
    balance: am,
    atm: am,
    health: am,
    potion: am,
    trash: am,
    wood: am,
    rock: am,
    string: am,
    petFood: am,
    stamina: am,
    emerald: am,
    diamond: am,
    gold: am,
    iron: am,
    kayu: am,
    batu: am,
    pedang: am,
    upgrader: am,
    common: am,
    uncommon: am,
    mythic: am,
    legendary: am,
    superior: am,
    pet: am,
    horse: am,
    horseexp: am,
    cat: am,
    catexp: am,
    fox: am,
    foxexp: am,
    dog: am,
    dogexp: am,
    robo: am,
    roboxp: am,
    banteng: am,
    harimau: am,
    gajah: am,
    kambing: am,
    panda: am,
    buaya: am,
    kerbau: am,
    sapi: am,
    monyet: am,
    babihutan: am,
    babi: am,
    ayam: am,
    horselastfeed: am,
    catlastfeed: am,
    foxlastfeed: am,
    doglastfeed: am,
    armor: 11,
    armordurability: am,
    sword: 11,
    bow: am,
    sworddurability: am,
    axedurability: am,
    pickaxe: 11,
    pickaxedurability: am,
    fishingrod: am,
    fishingroddurability: am,
    ojek: am,
    pedagang: am,
    dokter: am,
    petani: am,
    montir: am,
    kuli: am,
    bibitmangga: am,
    bibitapel: am,
    bibitpisang: am,
    bibitjeruk: am,
    bibitanggur: am,
    mangga: am,
    apel: am,
    pisang: am,
    jeruk: am,
    anggur: am,
    orca: am,
    paus: am,
    lumba: am,
    hiu: am,
    ikan: am,
    lele: am,
    bawal: am,
    nila: am,
    kepiting: am,
    lobster: am,
    gurita: am,
    cumi: am,
    udang: am,
    masak: am,
    masakrole: am,
    masakexp: am,
    masaklevel: am,
    bawang: am,
    cabai: am,
    kemiri: am,
    jahe: am,
    saus: am,
    asam: am,
    steak: am,
    sate: am,
    rendang: am,
    kornet: am,
    nugget: am,
    bluefin: am,
    seafood: am,
    sushi: am,
    moluska: am,
    squidprawm: am,
    catngexp: am,
    health: am,
    //Last All
    lastkerja: 0,
    lastadventure: 0,
    lastbansos: 0,
    lastberbru: 0,
    lastberkebon: 0,
    lastbunga: 0,
    lastbunuhi: 0,
    lastcode: 0,
    lastcodereg: 0,
    lastcrusade: 0,
    lastdagang: 0,
    lastduel: 0,
    lastdungeon: 0,
    lasteasy: 0,
    lastfight: 0,
    lastfishing: 0,
    lastgift: 0,
    lastgojek: 0,
    lastgrab: 0,
    lasthourly: 0,
    lasthunt: 0,
    lastIstigfar: 0,
    lastjb: 0,
    lastkill: 0,
    lastlink: 0,
    lastlumber: 0,
    lastmancingeasy: 0,
    lastmancingextreme: 0,
    lastmancinghard: 0,
    lastmancingnormal: 0,
    lastmining: 0,
    lastmisi: 0,
    lastmonthly: 0,
    lastmulung: 0,
    lastnambang: 0,
    lastnebang: 0,
    lastngocok: 0,
    lastngojek: 0,
    lastopen: 0,
    lastpekerjaan: 0,
    lastpotionclaim: 0,
    lastrampok: 0,
    lastramuanclaim: 0,
    lastrob: 0,
    lastroket: 0,
    lastsda: 0,
    lastseen: 0,
    lastSetStatus: 0,
    lastsironclaim: 0,
    lastbisnis: 0,
    lastsmancingclaim: 0,
    laststringclaim: 0,
    lastswordclaim: 0,
    lastturu: 0,
    lastwar: 0,
    lastwarpet: 0,
    lastweaponclaim: 0,
    lastweekly: 0,
    lastwork: 0,
  });
  m.reply("Am: " + am);
};

handler.command = ["cheatall"];
handler.owner = true;

export default handler;
//FG - JB Made By 𝙁𝘾 么 Glitch Editz#0433
