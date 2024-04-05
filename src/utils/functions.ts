export const formatDate = (dateString: string | undefined, convertDMY: boolean = false) => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    if (!dateString) return ''; 
  
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = months[monthIndex];

    if(convertDMY){
        return `${day}/${month}/${year}`
    } else {
        return `${day} de ${monthName}`;
    }
};
  
  export default formatDate;
  