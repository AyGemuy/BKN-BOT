const domain = "https://client.arifzyn.my.id";
const apikey = "ptla_mjBdknGQtMNmiRwwK916dmAf9ZHJeA5K0vXdNl2VXTS";
const c_apikey = "ptlc_wsbsSFl11OFEwEEE010b44GlYMHTgCShcQCLLuzBliD";

import fetch from "node-fetch";
import crypto from "crypto";
import { sizeFormatter } from "human-readable";

const format = sizeFormatter();
let handler = async (
  m,
  { conn, args, text, usedPrefix, command, isROwner }
) => {
  let _p = usedPrefix;
  const linkgc = "";
  switch (command) {
    case "addusr":
      {
        if (!isROwner) return global.dfail("rowner", m, conn);
        let t = text.split(",");
        if (t.length < 3)
          return m.reply(
            `*Format salah!*\n\nPenggunaan:\n${
              usedPrefix + command
            } email,username,number/tag`
          );
        let email = t[0];
        let username = t[1];
        let u = m.quoted
          ? m.quoted.sender
          : t[2]
          ? t[2].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
          : m.mentionedJid[0];
        if (!u)
          return m.reply(
            `*Format salah!*\n\nPenggunaan:\n${
              usedPrefix + command
            } email,username,number/tag`
          );
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = d.exists ? crypto.randomBytes(5).toString("hex") : t[3];
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: "ArifzynHOST",
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors)
          return m.reply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;

        let p = await conn.reply(
          m.chat,
          `*SUCCESS ADD SERVER*\n\nTYPE: user\n\nID: ${user.id}\nUUID: ${
            user.uuid
          }\nUSERNAME: ${user.username}\nEMAIL: ${user.email}\nNAME: ${
            user.first_name
          } ${user.last_name}\nBAHASA: ${user.language}\nADMIN: ${
            user.root_admin
          }\nCREATED AT: ${
            user.created_at
          }\n\nLOGIN: ${domain}\n*Password telah dikirim di private chat @${
            u.split`@`[0]
          }*`,
          m,
          { mentions: [u] }
        );
        conn.sendMessage(u, {
          text: `*BERIKUT  AKUN PANEL ANDA*\n\nEMAIL: ${email}\nUSERNAME: ${username}\nPASSWORD: ${password.toString()}\nLOGIN: ${domain}\n\n*NOTE*\n_*BOT* atau *ArifzynXD PANEL* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH`,
        });
      }
      break;
    case "delusr":
      {
        if (!isROwner) return global.dfail("rowner", m, conn);
        let usr = args[0];
        if (!usr) return m.reply("ID nya mana?");
        let f = await fetch(domain + "/api/application/users/" + usr, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        //let res = await f.json()
        let res = f.ok
          ? {
              errors: null,
            }
          : await f.json();
        if (res.errors) return m.reply("*USER NOT FOUND*");
        m.reply("*SUCCESS DELETE AKUN USER*");
      }
      break;
    case "listusr":
      {
        let page = args[0] ? args[0] : "1";
        let f = await fetch(domain + "/api/application/users?page=" + page, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = await f.json();
        let anu = res.data;
        let sections = [];
        for (var user of anu) {
          let u = user.attributes;
          let obj = {
            title: "-- ArifzynXD PANEL --",
            rows: [
              {
                title: `${u.id}. ${u.username}`,
                rowId: `${usedPrefix}detusr ` + u.id,
                description: u.first_name + " " + u.last_name,
              },
            ],
          };
          await sections.push(obj);
          if (sections.length === 50) {
            sections.push({
              title: "-- ArifzynXD PANEL --",
              rows: [
                {
                  title: ` NEXT`,
                  rowId: `${usedPrefix}listusr 2`,
                  description: "Page 2",
                },
              ],
            });
          }
        }
        const listMessage = {
          text: "\nBerikut list user *ArifzynXD HOST*",
          footer: `\nPage: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
          title: `ArifzynXD HOSTING`,
          buttonText: `${res.meta.pagination.count} User`,
          sections,
        };
        await conn.sendMessage(m.chat, listMessage, { quoted: m });

        /*await conn.sendMessage(m.chat, {
                text: "Berikut list user *ArifzynXD PANEL*",
                footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
                title: "*REII BOTZ HOST*",
                buttonText: `${res.meta.pagination.count} Users`,
                sections
            })*/
      }
      break;
    case "detusr":
      {
        let usr = args[0];
        let f = await fetch(domain + "/api/application/users/" + usr, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = await f.json();
        if (res.errors) return m.reply("*USER NOT FOUND*");
        let u = res.attributes;
        m.reply(
          `*${u.username.toUpperCase()} USER DETAILS*\n\n\`\`\`ID: ${
            u.id
          }\nUUID: ${u.uuid}\nUSERNAME: ${u.username}\nEMAIL: ${
            u.email
          }\nNAME: ${u.first_name} ${u.last_name}\nLANGUAGE: ${
            u.language
          }\nADMIN: ${u.root_admin}\nCREATED AT: ${u.created_at}\`\`\``
        );
      }
      break;
    case "addsrv":
      {
        if (!isROwner) return global.dfail("rowner", m, conn);
        let [name, usr_id, egg, loc, memo, memo_disk, cpu] = text.split(",");
        if (!text)
          return m.reply(
            `*Format salah!*\n\nPenggunaan:\n${
              usedPrefix + command
            } name,userId,eggId,locId,memory,disk,cpu`
          );

        let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let data = await f1.json();
        //console.log(data.attributes.startup)
        let startup_cmd = data.attributes.startup;

        let f = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: "Panel By ArifzynXD",
            user: usr_id,
            egg: parseInt(egg),
            docker_image: "kangyud/node:18",
            startup:
              'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: {
              CMD_RUN: "npm start",
              GIT_ADDRESS: "",
              BRANCH: "",
              USERNAME: "",
              ACCESS_TOKEN: "",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: memo_disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            // "allocation": {
            //     "default": 36
            // }
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f.json();
        if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        m.reply(
          `*SUCCESS MEMBUAT AKUN USER SERVER*\n\nTYPE: ${res.object}\n\nID: ${
            server.id
          }\nUUID: ${server.uuid}\nNAME: ${server.name}\nDESCRIPTION: ${
            server.description
          }\nMEMORY: ${
            server.limits.memory === 0 ? "Unlimited" : server.limits.memory
          } MB\nDISK: ${
            server.limits.disk === 0 ? "Unlimited" : server.limits.disk
          } MB\nCPU: ${server.limits.cpu}%\nCREATED AT: ${server.created_at}`
        );
      }
      break;
    case "delsrv":
      {
        if (!isROwner) return global.dfail("rowner", m, conn);
        let srv = args[0];
        if (!srv) return m.reply("ID nya mana?");
        let f = await fetch(domain + "/api/application/servers/" + srv, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = f.ok
          ? {
              errors: null,
            }
          : await f.json();
        if (res.errors) return m.reply("*SERVER NOT FOUND*");
        m.reply("*SUCCESS MENGHAPUS AKUN USER *");
      }
      break;
    case "listsrv":
      {
        let page = args[0] ? args[0] : "1";
        let f = await fetch(domain + "/api/application/servers?page=" + page, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = await f.json();
        let servers = res.data;
        let sections = [];
        for (let server of servers) {
          let s = server.attributes;
          let f3 = await fetch(
            domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + c_apikey,
              },
            }
          );
          let data = await f3.json();
          let obj = {
            title: "-- ArifzynXD HOST --",
            rows: [
              {
                title: `${s.id}. ${s.name}`,
                rowId: `${usedPrefix}detsrv ` + s.id,
                description: `Status: ${
                  data.attributes ? data.attributes.current_state : s.status
                }`,
              },
            ],
          };
          await sections.push(obj);
          if (sections.length >= 50 && res.meta.pagination.links.next) {
            sections.push({
              title: "-- Arifzyn HOST --",
              rows: [
                {
                  title: ` NEXT`,
                  rowId: `${!usedPrefix}listsrv 2`,
                  description: "Page 2",
                },
              ],
            });
          }
        }

        await conn.sendMessage(
          m.chat,
          {
            text: "Berikut list server *ArifzynXD HOST*",
            footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
            title: "*ArifzynXD HOST*",
            buttonText: `${res.meta.pagination.count} Servers`,
            sections,
          },
          { quoted: m }
        );
      }
      break;
    case "detsrv":
      {
        let srv = args[0];
        let f = await fetch(domain + "/api/application/servers/" + srv, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "!application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let res = await f.json();
        if (res.errors) return m.reply("*SERVER NOT FOUND*");
        let s = res.attributes;
        let f2 = await fetch(
          domain + "/api/client/!servers/" + s.uuid.split`-`[0] + "/resources",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + c_apikey,
            },
          }
        );
        let data = await f2.json();
        let t = data.attributes;
        m.reply(
          `*${s.name.toUpperCase()} SERVER DETAILS*\n\n\`\`\`STATUS: ${
            t.current_state
          }\n\nID: ${s.id}\nUUID: ${s.uuid}\nNAME: ${s.name}\nDESCRIPTION: ${
            s.description
          }\nMEMORY: ${await format(t.resources.memory_bytes).toString()} / ${
            s.limits.memory === 0 ? "Unlimited" : s.limits.memory + "MB"
          }\nDISK: ${!(await format(t.resources.disk_bytes).toString())} / ${
            s.limits.disk === 0 ? "Unlimited" : s.limits.disk + "MB"
          }\nCPU: ${t.resources.cpu_absolute}% / ${
            s.limits.cpu === 0 ? "Unlimited" : s.limits.cpu + "%"
          }\nCREATED AT: ${s.created_at}\`\`\``
        );
      }
      break;
    case "reinstall":
      {
        if (!isROwner) return global.dfail("rowner", m, conn);
        let srv = args[0];
        if (!srv) return m.reply("ID nya mana?");
        let f = await fetch(
          domain + "/api/application/servers/" + srv + "/reinstall",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          }
        );
        let res = f.ok
          ? {
              errors: null,
            }
          : await f.json();
        if (!res.errors) return m.reply("*SERVER NOT FOUND*");
        m.reply("*REINSTALLING THE SERVER..*");
      }
      break;
    case "updatesrv":
      {
        if (!isROwner) return global.dfail("rowner", m, conn);
        let t = text.split(",");
        if (t.length < 4)
          return m.reply(
            `*Format salah*\n\nPenggunaan:\n${
              usedPrefix + command
            } srvId,locId,memory/disk,cpu`
          );
        let srv = t[0];
        let loc = t[1];
        let memo_disk = t[2].split`/`;
        let cpu = t[3];
        let f1 = await fetch(domain + "/api/application/servers/" + srv, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let data = await f1.json();

        let f = await fetch(
          domain + "/api/application/servers/" + srv + "/build",
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              allocation: parseInt(loc) || data.attributes.allocation,
              memory: memo_disk[0] || data.attributes.limits.memory,
              swap: data.attributes.limits.swap || 0,
              disk: memo_disk[1] || data.attributes.limits.disk,
              io: 500,
              cpu: cpu || data.attributes.limits.cpu,
              threads: null,
              feature_limits: {
                databases: 5,
                allocations: 5,
                backups: 5,
              },
            }),
          }
        );
        let res = await f.json();
        if (!res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        m.reply(
          `*SUCCESS MEMBUAT AKUN  SERVER*\n\nTYPE: ${res.object}\n\nID: ${
            server.id
          }\nUUID: ${server.uuid}\nNAME: ${server.name}\nDESCRIPTION: ${
            server.description
          }\nMEMORY: ${
            server.limits.memory === 0 ? "Unlimited" : server.limits.memory
          } MB\nDISK: ${
            server.limits.disk === 0 ? "Unlimited" : server.limits.disk
          } MB\nCPU: ${server.limits.cpu}%\nCREATED AT: ${
            server.created_at
          }\nUPDATED AT: ${server.updated_at}`
        );
      }
      break;
    case "startsrv":
    case "stopsrv":
    case "restartsrv": {
      let action = command.replace("srv", "");
      let srv = args[0];
      if (!srv) return m.reply("ID nya mana?");
      let f = await fetch(domain + "/api/client/servers/" + srv + "/power", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + c_apikey,
        },
        body: JSON.stringify({
          signal: action,
        }),
      });

      let res = f.ok
        ? {
            errors: null,
          }
        : await f.json();
      if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
      m.reply(`*SUCCESSFULLY ${action.toUpperCase()} THE SERVER*`);
    }
  }
};

handler.help = handler.command = [
  "addusr",
  "delusr",
  "listusr",
  "detusr",
  "addsrv",
  "delsrv",
  "listsrv",
  "detsrv",
  "reinstall",
  "updatesrv",
  "startsrv",
  "stopsrrv",
  "restartsrv",
];
handler.tags = ["store"];
handler.owner = true;

export default handler;
