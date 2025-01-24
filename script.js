document.addEventListener("DOMContentLoaded", () => {
    // Textos para cada idioma
    const translations = {
        de: {
            title: "Die mobile Massage",
            heading: "Die mobile Massage, im Komfort Ihres Hauses",
            description: "Entdecken Sie die Kraft der Entspannung im Komfort Ihres Hauses in Berlin.",
            button: "Buchen Sie Ihre Massage",
            services: "Dienstleistungen",
            about: "Über mich",
            howItWorks: "Wie funktioniert's?",
            faq: "Häufige Fragen",
            whatsapp: "Massage buchen", // Texto do botão do WhatsApp
        },
        pt: {
            title: "A Massagem Móvel",
            heading: "A Massagem móvel, no Conforto de Sua Casa",
            description: "Descubra o poder do relaxamento no conforto da sua casa em Berlim.",
            button: "Agenda sua massagem",
            services: "Serviços",
            about: "Sobre mim",
            howItWorks: "Como Funciona?",
            faq: "Perguntas Frequentes",
            whatsapp: "Agenda sua massagem", // Texto do botão do WhatsApp
        },
        en: {
            title: "The Mobile Massage",
            heading: "The Mobile Massage, in the Comfort of Your Home",
            description: "Discover the power of relaxation in the comfort of your home in Berlin.",
            button: "Book your massage",
            services: "Services",
            about: "About Me",
            howItWorks: "How It Works?",
            faq: "Frequently Asked Questions",
            whatsapp: "Book your massage", // Texto do botão do WhatsApp
        },
    };

    // Detecta o idioma atual do localStorage ou define para 'de'
    let currentLanguage = localStorage.getItem("language") || "de";
    updateLanguage(currentLanguage);

    // Função para atualizar o idioma
    function updateLanguage(language) {
        currentLanguage = language;
        localStorage.setItem("language", language);

        // Atualizar textos principais
        document.title = translations[language].title;
        document.querySelector("h1").textContent = translations[language].heading;
        document.querySelector("p").textContent = translations[language].description;
        document.querySelector(".cta-button").textContent = translations[language].button;

        // Atualizar os botões de navegação
        const buttons = document.querySelectorAll(".button-box .button span");
        if (buttons.length === 4) {
            buttons[0].textContent = translations[language].services;
            buttons[1].textContent = translations[language].about;
            buttons[2].textContent = translations[language].howItWorks;
            buttons[3].textContent = translations[language].faq;
        }

        // Atualizar o texto do botão do WhatsApp
        const whatsappButton = document.querySelector(".cta-whatsapp .agenda-text");
        if (whatsappButton) {
            whatsappButton.textContent = translations[language].whatsapp;
        } else {
            console.error("Botão do WhatsApp não encontrado.");
        }
    }

    // Adicionar eventos aos botões de idioma
    document.querySelectorAll(".languages button").forEach(button => {
        button.addEventListener("click", () => {
            const language = button.textContent.toLowerCase(); // de, pt, en
            updateLanguage(language === "deutsch" ? "de" : language === "português" ? "pt" : "en");
        });
    });

    // Adicionar redirecionamento para manter o idioma selecionado ao clicar nos links
    const languageLinks = document.querySelectorAll("a"); // Selecionar todos os links da página
    languageLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const language = localStorage.getItem("language");
            if (language) {
                // Verifica se a URL já contém a query string com idioma, caso contrário, adiciona
                const url = new URL(link.href);
                if (!url.searchParams.has("lang")) {
                    url.searchParams.set("lang", language); // Adiciona o parâmetro do idioma
                }
                // Redireciona com o idioma na URL
                link.href = url.toString();
            }
        });
    });
});
