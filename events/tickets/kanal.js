const { EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, Events, Embed, ChannelType } = require('discord.js');
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
//funkcja ogólna, unika powtarzania się kodu
async function main(metoda, przedmiot, interaction, user){
    await interaction.deferReply({ ephemeral: true })
    try{
        const channel = await interaction.guild.channels.create({
            name: `🛒〢${przedmiot}`,
            type: ChannelType.GuildText,
            parent: config.tickety_kategoria_id,
        })
        if(config.dodatkowy_dostep == false){
            channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ])
        } else {
            channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: config.dodatkowy_dostep_rola_id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                }
            ])
        }
        let produkt
        if (przedmiot === 'przedmiot1'){
            produkt = "Testowy przedmiot numer 1"
        } else if(przedmiot === 'przedmiot2'){
            produkt = "Testowy przedmiot numer 2"
        } else if(przedmiot === 'przedmiot3'){
            produkt = "Testowy przedmiot numer 3"
        }
        const desc = config.kanal_ticket_embed_opis + `\n\n` + "`🔧 Kupujący:` <@" + user.id + ">\n`🔧 Produkt: " + produkt + "`\n`🔧 Metoda Płatności: " + metoda + "`"
        interaction.editReply({
            content: "Sukces! Kanał: <#" + channel.id + ">" 
        })
        const embed = new EmbedBuilder()
        .setTimestamp()
        .setTitle("Zakup")
        .setDescription(desc)
        .setFooter({ text: config.nazwa })
        .setColor(config.glowny_kolor)

        const button_zamknij = new ButtonBuilder()
        .setCustomId('ticket-zamknij-1')
        .setStyle("Secondary")
        .setLabel("Zamknij ticket")

        const button_ustawienia = new ButtonBuilder()
        .setCustomId('ticket-ustawienia')
        .setStyle("Secondary")
        .setLabel("Ustawienia")
        const row = new ActionRowBuilder()
        .addComponents(button_zamknij, button_ustawienia)

        channel.send({
            embeds: [embed],
            components: [row]
        })
    } catch(e){
        const embed = new EmbedBuilder()
            .setColor('DarkRed')
            .setDescription('❌ Wystąpił błąd #1.\n Możliwości:\n- Brak uprawnień bota\n- Kategoria ticketów nie istnieje/jest zapełniona')
        interaction.editReply({
            embeds: [embed],
            ephemeral: true
        })
        return 
    }

}

module.exports = {
	name: Events.InteractionCreate, 
	once: false, 
	async execute(interaction) {
        const { commandName, options } = interaction
        if(interaction.customId === "metody-blik"){
            const przedmiot = interaction.message.content
            main("Blik", przedmiot, interaction, interaction.user)
        } else if(interaction.customId === "metody-paypal"){
            const przedmiot = interaction.message.content
            main("PayPal", przedmiot, interaction, interaction.user)
        }else if(interaction.customId === "metody-ltc"){
            const przedmiot = interaction.message.content
            main("Litecoin", przedmiot, interaction, interaction.user)
        }
    },
};