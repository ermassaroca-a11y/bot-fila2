const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let fila = [];

client.on('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!painel') {

    const embed = new EmbedBuilder()
      .setTitle('🎫 Sistema de Fila')
      .setDescription('Use os botões abaixo para entrar ou sair da fila')
      .setColor('Purple');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('entrar').setLabel('Entrar').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('sair').setLabel('Sair').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('ver').setLabel('Ver Fila').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary),
    );

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const id = interaction.user.id;

  if (interaction.customId === 'entrar') {
    if (fila.includes(id)) {
      return interaction.reply({ content: 'Você já está na fila.', ephemeral: true });
    }
    fila.push(id);
    return interaction.reply({ content: `Entrou na fila! Posição: ${fila.length}`, ephemeral: true });
  }

  if (interaction.customId === 'sair') {
    fila = fila.filter(user => user !== id);
    return interaction.reply({ content: 'Saiu da fila.', ephemeral: true });
  }

  if (interaction.customId === 'ver') {
    if (fila.length === 0) {
      return interaction.reply({ content: 'Fila vazia.', ephemeral: true });
    }
    const lista = fila.map((u, i) => `${i + 1} - <@${u}>`).join('\n');
    return interaction.reply({ content: `Fila:\n${lista}`, ephemeral: true });
  }

  if (interaction.customId === 'proximo') {
    if (fila.length === 0) {
      return interaction.reply({ content: 'Fila vazia.', ephemeral: true });
    }
    const next = fila.shift();
    return interaction.reply({ content: `<@${next}> é o próximo!` });
  }
});

client.login(process.env.MTQ3MzEwOTAwNTQ3MDUzMTc2Nw.GjaCqi.Lm_lJOun57Q29O1nuCXOd60e5mG6ka17wXj8VM);
