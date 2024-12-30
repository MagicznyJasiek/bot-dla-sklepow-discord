const { EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, Events, Embed } = require('discord.js');
const { Client, GatewayIntentBits, Permissions, ChannelsTypeDef, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const config = require('../../config/config.js');
function senderrormsg(interaction, text){
    const embed = new EmbedBuilder()
    .setColor('DarkRed')
    .setDescription('❌ ' + text)
    interaction.reply({
        embeds: [embed],
        ephemeral: true
    })
}
module.exports = {
	name: Events.InteractionCreate, 
	once: false, 
	async execute(interaction) {
        if (!interaction.isCommand()) return
        const { commandName, options } = interaction
        if(commandName !== "metody") return
        if(options.getSubcommand() === "płatności") {
            //tworzymy opis embeda
            let text = `- Blik: **${config.blik_numer}**
- PayPal: **${config.paypal_email}**\n`

            // jeżeli w configu włączono możliwość płacenia LTC, dodajemy do opisu embeda
            if (config.platnosc_ltc_mozliwa == true){
                text = text + `- LTC: **${config.ltc_adres}**`
            }
            
            //tworzymy cały embed
            const embed = new EmbedBuilder()
            .setTitle(`Metody Płatności - ${config.nazwa}`)
            .setDescription(text)
            .setColor(config.glowny_kolor)
            .setTimestamp()
            .setFooter({ text: config.nazwa })
            //wysyłamy embed odpowiadając na interakcje
            interaction.reply({
                embeds: [embed]
            })
        }
    },
};