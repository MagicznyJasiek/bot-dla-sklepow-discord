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
        const { commandName, options } = interaction
        if(interaction.customId === "ticket-stworz"){

            // tworzymy embeda z metodą płatności
            const embed = new EmbedBuilder()
            .setTitle("Wybierz metode płatności")
            .setDescription("Aby wybrać metode płatności, kliknij jeden przycisk pod tą wiadomością.")
            .setColor(config.glowny_kolor)
            .setFooter({ text: config.nazwa})

            // tworzymy przyciski metod płatności
            const button_blik = new ButtonBuilder()
            .setCustomId("metody-blik")
            .setLabel("Blik")
            .setStyle("Secondary")
            const button_paypal = new ButtonBuilder()
            .setCustomId("metody-paypal")
            .setLabel("PayPal")
            .setStyle("Secondary")

            let button_ltc = new ButtonBuilder()
            .setCustomId("metody-ltc")
            .setLabel("Litecoin")
            .setStyle("Secondary")
            
            // jeżeli płatność lite coin jest wyłączona, wyłączamy też przycisk
            if(config.platnosc_ltc_mozliwa == false){
                button_ltc.setDisabled(true)
            }

            //tworzymy row
            const row = new ActionRowBuilder()
            .addComponents(button_blik, button_paypal, button_ltc)
            
            //wysyłamy użytkownikowi
            interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true,
                content: interaction.values[0]
            })
        }
    },
};