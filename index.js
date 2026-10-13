const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session')

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['ANITA-MD-V2', 'Safari', '1.0']
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message) return

    const text = m.message.conversation || m.message.extendedTextMessage?.text || ""
    const from = m.key.remoteJid

    // COMMANDE.MENU
    if (text === '.menu') {
      await sock.sendMessage(from, { text: `👑 *ANITA-MD-V2* 👑\n\nOwner: 22896352213\n\nCommandes:\n.menu - ce menu\n.sticker - image en sticker\n.ping - vitesse\n\nBot 100% à toi, sans OVL!` })
    }

    // COMMANDE.STICKER
    if (text === '.sticker') {
      await sock.sendMessage(from, { text: "Envoie une image avec.sticker en légende" })
    }

    // COMMANDE.PING
    if (text === '.ping') {
      await sock.sendMessage(from, { text: "Pong! ⚡️ ANITA-MD-V2 est en ligne" })
    }
  })
}

startBot()
