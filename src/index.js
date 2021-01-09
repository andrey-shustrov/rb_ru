import './scss/styles.scss';
import $ from "jquery";

$(function(){

    // Порядковый номер большой карточки
    function indexBox(){
        var box = $('.section-people_list');
        var sender = $('.section-people_card_active', box);
        var infoCards = $('.section-people_card_big', box);

        // Индекс активной карточки
        var indexCard = sender.index();

        if(indexCard === -1) {
            infoCards.css('order', 10000); // Опускаем далеко вниз скрытый блок
            return; 
        }

        // Смотрим ширину и определяем сколько карточек в ряд
        var windowWidth = box.outerWidth(true) + 10; // Ширина блока
        var widthCard = sender.outerWidth(true); // Ширина карточки
        var widthIndex = Math.floor(windowWidth / widthCard); // Карточек в ряд
        var row = Math.floor(indexCard / widthIndex); // Ряд с открытой карточкой
        var order = (widthIndex * row + widthIndex) - 1; // Номер для вставки большого блока

        // Ставим порядковый номер
        infoCards.css('order', order);
    }

    // Расставляем всем карточкам порядковые номера
    $('.section-people_card').each(function(i) {
        $(this).css('order', i);
    });

    // Клик по карточке
    $('.section-people_card').on('click', function(){

        var sender = $(this);
        var box = sender.closest('.section-people_list');
        var allCards = $('.section-people_card', box);
        var infoCards = $('.section-people_card_big', box);

        if(sender.is('.section-people_card_active')) { // Выключаем показ большого блока

            // Выключение карточки
            sender.removeClass('section-people_card_active');
            // Скрытие большого блока
            box.removeClass('section-people_card_big_active');

        } else { // Включаем показ большого блока

            // Удаляем классы у других блоков если они есть и включаем у нашей карточки
            allCards.removeClass('section-people_card_active'); 
            sender.addClass('section-people_card_active');
            
            // Вставляем / Заменяяем данные в большой блок
            var id = $('.section-people_card_big_number', infoCards);
            var name = $('.section-people_card_big_box > h1', infoCards);
            var company = $('.section-people_card_big_box > h2:first', infoCards);
            var money = $('.section-people_card_big_box > h2:last > span', infoCards);

            id.html(sender.data('id'));
            name.html(sender.data('name'));
            company.html(sender.data('company'));
            money.html(sender.data('money'));

            // Ставим порядковый номер большого блока
            indexBox(sender);

            // Показ большого блока
            box.addClass('section-people_card_big_active');
        }

    });

    // меню
    $('.header_top_menu').on('click', function(){
        var sender = $(this);
        var header = sender.closest('.header');

        if(header.is('.header_top_menu_open'))
            header.removeClass('header_top_menu_open');
        else 
            header.addClass('header_top_menu_open');
    });


    // resize
    $(window).on('load resize', indexBox);

});