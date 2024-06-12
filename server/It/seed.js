const It = require('./It')


const data =[
        'Прогнозы в IT',
        'Веб-разработка',
        'Мобильная разработка',
        'Фриланс',
        'Алгоритмы',
        'Тестирование IT систем',
        'Разработка игр',
        'Дизайн и юзабилити',
        'Искуственный интелект',
        'Машинное обучение',
]

async function WriteDataIt(){
    const length = await It.countDocuments()
    if(length == 0){
        data.map((item , index) =>{
            new It({
                name : item,
                key : index
            }).save()
        })
    }
}

module.exports = WriteDataIt