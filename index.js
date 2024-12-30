const Discord = require("discord.js");
const { EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require('discord.js');
const { Client, GatewayIntentBits, Permissions, ChannelsTypeDef, PermissionFlagsBits, PermissionsBitField, ActivityType, ChannelType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config/config.js');
const internal = require("node:stream");
const { TextInputBuilder } = require("discord.js");
const { ModalBuilder } = require("discord.js");
const client = new Client({
    intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,   
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites,
]	
})
client.setMaxListeners(20)
function getAllEventFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllEventFiles(filePath, arrayOfFiles);
        } else if (file.endsWith('.js')) {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = getAllEventFiles(eventsPath);

for (const filePath of eventFiles) {
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


client.on("ready", async () => {
    client.user.setActivity({
        type: ActivityType.Custom,
        name: "customstatus",
        state: config.customstatus,
    })
    const commands = client.application.commands
    client.application.commands.fetch()
    commands.create({
        name: "ticket",
        description: "Komenda administracyjna. Wysyła panel ticketów."
    })
    commands.create({
        name: "metody",
        description: "Komenda metody.",
        options: [
            {
                name: "płatności",
                type: 1,
                description: "Wysyła dostępne metody płatności"
            }
        ]
    })
    client.application.commands.update
    client.application.commands.fetch()
    .then(commands => {
        commands.forEach(command => {
            /*
            if(command.id === '1296924317526786069' || command.id === '1296924080444018750' || command.id === '1296986392647172138'){
                command.delete(command.id)
            }
            */
            console.log(`${command.name}: ${command.id}`);
        });
    })
    console.log(`Sukces | ${client.user.tag}`)
})
client.on("interactionCreate", async (interaction) => {
    if(interaction.customId === 'ticket-ustawienia-dodaj'){
        const modal = new ModalBuilder()
        .setCustomId('ticket-ustawienia-dodaj-modal')
        .setTitle("Dodaj osobę do ticketa")

        const userid = new TextInputBuilder()
        .setCustomId('user-id')
        .setLabel('ID użytkownika do dodania')
        .setStyle(Discord.TextInputStyle.Short)

        const row = new ActionRowBuilder()
        .addComponents(userid)
        modal.addComponents(row)

        await interaction.showModal(modal)
    } else {
        if(!interaction.isModalSubmit()) return
        if(interaction.customId === 'ticket-ustawienia-dodaj-modal'){
            const userid = interaction.fields.getTextInputValue('user-id')
            const member = interaction.guild.members.cache.get(userid)
            if(!member){
                return interaction.reply(
                    {
                        content: "Wystąpił błąd. Upewnij się, że ID użytkownika jest prawidłowe.",
                        ephemeral: true
                    }
                )
            }
            try{
                interaction.channel.permissionOverwrites.create(
                member.id,
                {
                    //id: member.id,
                    ViewChannel: true
                })
                interaction.reply({
                    content: "Dodano!",
                    ephemeral: true
                })
            } catch(e){
                return interaction.reply(
                    {
                        content: "Wystąpił błąd. Upewnij się, że ID użytkownika jest prawidłowe.",
                        ephemeral: true
                    }
                )
            }
        }
    }
})
client.login(config.token) 