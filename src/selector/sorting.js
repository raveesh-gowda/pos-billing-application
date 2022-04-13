export const sortFunction = (data) => {
   const result = data.sort((a, b) => {
      if (a.name > b.name) {
         return 1;
      } else if (a.name < b.name) {
         return -1;
      } else {
         return 0;
      }
   });
   return result;
};
