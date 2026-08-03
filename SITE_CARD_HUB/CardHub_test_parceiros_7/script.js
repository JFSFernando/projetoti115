const ctx = document.getElementById('partnerChart');


new Chart(ctx, {


type: 'bar',


data:{


labels:[

'Jan',
'Fev',
'Mar',
'Abr',
'Mai',
'Jun',
'Jul'

],


datasets:[


{

label:'Receita dos parceiros',

data:[

12000,
18000,
24000,
31000,
42000,
52000,
65000

],

borderWidth:1


}


]


},



options:{


responsive:true,


plugins:{


legend:{


display:true


}


}


}



});