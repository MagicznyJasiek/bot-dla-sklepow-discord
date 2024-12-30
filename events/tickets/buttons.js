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
        if(interaction.customId === "ticket-zamknij-1"){
            const embed = new EmbedBuilder()
            .setTitle("Potwierdzenie zamknięcia")
            .setDescription("Czy na pewno chcesz zamknąć tego ticketa?")
            .setColor(config.glowny_kolor)

            const button = new ButtonBuilder()
            .setCustomId("ticket-zamknij-2")
            .setLabel("Zamknij")
            .setStyle("Secondary")
            const row = new ActionRowBuilder()
            .addComponents(button)

            interaction.reply({
                embeds: [embed],
                components: [row]
            })
        } else if(interaction.customId === "ticket-zamknij-2"){
            try{
                interaction.channel.delete()
            } catch(e){
                const embed = new EmbedBuilder()
                .setColor('DarkRed')
                .setDescription('❌ Wystąpił błąd #1.\n Możliwości:\n- Brak uprawnień bota')

                interaction.editReply({
                    embeds: [embed],
                    ephemeral: true
                })
                return
            }
        } else if(interaction.customId === "ticket-ustawienia"){
            if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                senderrormsg(interaction, "Wymagane permisje: `Administrator`")
            }
            const embed = new EmbedBuilder()
            .setTitle("Ustawienia")
            .setColor(config.glowny_kolor)
            .setDescription("Ustawienia są poniżej. Używaj guzików.")

            const button_dodaj_osobe = new ButtonBuilder()
            .setCustomId('ticket-ustawienia-dodaj')
            .setStyle("Secondary")
            .setLabel("Dodaj osobę do ticketa")

            const row = new ActionRowBuilder()
            .addComponents(button_dodaj_osobe)

            interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            })
        } 
    },
};