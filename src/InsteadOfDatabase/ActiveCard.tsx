type CardLevel= 'Выпускникам школ' | 'Успешным лицеистам и гимназистам' | 'Рядовым студентам' | 'Будущим специалистам'


interface Card {
    CardTitle: string;
    CardID: string;
    Section: string;
    Theme: string;
    SubTheme: string;
    SubSubTheme: string;
    CardLevel: CardLevel;
    VideoURL: string;
    CardText: string;
}

export const ActiveCard: Card =
    {
        'CardTitle': 'О ПРОЕКТЕ ЧКМИФ НАВИГАТОР',
        'CardID': '3.1.1.1.1.2.1',
        'Section': 'Физика',
        'Theme': '_Общие вопросы',
        'SubTheme': '__Общие вопросы',
        'SubSubTheme': '__Общие вопросы',
        'CardLevel': 'Выпускникам школ',
        'VideoURL': 'https://www.youtube.com/watch?v=7sDY4m8KNLc',
        'CardText': 'Дается краткая характеристика проекта Массового Индивидуализированного Физического образования\n' +
            '(МИФО) и сопровождающей оболочки свободного доступа к качественным образовательным\n' +
            'Интернет-ресурсам, включая авторский курс Чируова А.С. Интерактивного Многоуровневого обучения\n' +
            'физике (ЧК_МИФ).\n' +
            '/Пленарный доклад на удаленной сессии XXVI Международной научно-методическая конференции\n' +
            '"Современное образование: содержание, технологии, качество" 2020_09_29. Длительность 0:29:10'
    }