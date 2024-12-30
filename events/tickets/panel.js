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
        if(commandName === "ticket") {
            // Sprawdzanie, czy użytkownik (member) ma permisje Administrator
            if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                senderrormsg(interaction, "Wymagane permisje: `Administrator`")
            }

            //Tworzenie drop downa
            const select = new StringSelectMenuBuilder()
			.setCustomId('ticket-stworz')
			.setPlaceholder('💳 Wybierz produkt!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Przedmiot 1')
					.setEmoji('💰')
					.setValue('przedmiot1'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Przedmiot 2')
					.setEmoji('💸')
					.setValue('przedmiot2'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Przedmiot 3')
					.setEmoji('✨')
					.setValue('przedmiot3'),
			)
            // row, aby dodać do wiadomości
            const row = new ActionRowBuilder()
            .addComponents(select);
            
            // tworzenie embeda, który zostanie wysłany
            const embed = new EmbedBuilder()
            .setTitle(config.tickety_embed_naglowek)
            .setDescription(config.tickety_embed_opis)
            .setColor(config.glowny_kolor)

            //dodajemy grafike do embeda, jeżeli jest ustawiona w configu
            if(config.tickety_embed_zdjecie == true){
                embed.setImage(config.tickety_embed_zdjecie_url)
            }

            // Wysyłanie wiadomości z panelem
            interaction.channel.send({
                embeds: [embed],
                components: [row]
            })

            //Reagowanie na interakcje, aby uniknąć "Aplikacja nie reaguje"
            interaction.reply({
                content: "Wysłano",
                ephemeral: true
            })
        }
    },
};