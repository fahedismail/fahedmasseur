document.addEventListener('DOMContentLoaded', function () {
    const languageButtons = document.querySelectorAll('.language-button');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    let currentLanguage = localStorage.getItem('language') || 'DE'; // Idioma padrão é alemão (DE)

    // Função para carregar as traduções
    function loadLanguage(lang) {
        if (lang === 'DE') {
            // Se o idioma for alemão, restaura o conteúdo original
            elementsToTranslate.forEach(element => {
                const originalText = element.getAttribute('data-original');
                if (originalText) {
                    if (element.tagName === 'IMG') {
                        element.src = originalText; // Restaura a imagem original
                    } else {
                        element.textContent = originalText; // Restaura o texto original
                    }
                }
            });

            // Salva o idioma selecionado no localStorage
            localStorage.setItem('language', lang);
            console.log('Idioma padrão (DE) selecionado. Restaurando conteúdo original.');
        } else {
            // Carrega as traduções para outros idiomas
            fetch(`/translations/${lang}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro ao carregar o arquivo de tradução: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(translations => {
                    console.log(`Traduções carregadas para o idioma: ${lang}`, translations);

                    // Atualiza o conteúdo dos elementos com os dados traduzidos
                    elementsToTranslate.forEach(element => {
                        const key = element.getAttribute('data-translate');
                        const keys = key.split('.'); // Divide a chave em partes
                        let value = translations;

                        // Percorre o objeto de traduções para acessar a chave correta
                        for (let k of keys) {
                            if (value && value[k]) {
                                value = value[k];
                            } else {
                                console.warn(`Chave de tradução não encontrada: ${key}`);
                                value = null;
                                break;
                            }
                        }

                        if (value) {
                            // Salva o conteúdo original antes de substituí-lo
                            if (!element.getAttribute('data-original')) {
                                if (element.tagName === 'IMG') {
                                    element.setAttribute('data-original', element.src);
                                } else {
                                    element.setAttribute('data-original', element.textContent);
                                }
                            }

                            // Atualiza o conteúdo traduzido
                            if (element.tagName === 'IMG') {
                                element.src = value; // Atualiza a imagem
                            } else {
                                element.textContent = value; // Atualiza o texto
                            }
                        }
                    });

                    // Salva o idioma selecionado no localStorage
                    localStorage.setItem('language', lang);
                })
                .catch(error => console.error('Erro ao carregar o arquivo de tradução:', error));
        }
    }

    // Carrega o idioma salvo ao carregar a página
    loadLanguage(currentLanguage);

    // Adiciona eventos de clique aos botões de idioma
    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang'); // Obtém o idioma do botão clicado
            console.log(`Botão de idioma clicado: ${lang}`);
            loadLanguage(lang); // Carrega as traduções ou restaura o conteúdo original
        });
    });
});