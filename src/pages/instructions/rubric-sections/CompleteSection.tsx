 const CompleteSection = () => {
   return (
     <div className="flex flex-col items-center justify-center py-12 text-center">
       <h2 className="text-3xl font-bold text-foreground mb-4">You're Ready!</h2>
       <p className="text-lg text-muted-foreground max-w-xl mb-8">
         You now have the foundation to write prompts and create rubrics that challenge AI and contribute to meaningful model improvements.
       </p>
       
       <div className="space-y-4 mt-4">
         <p className="text-sm uppercase tracking-wider text-muted-foreground">Course Completion Code</p>
         <p className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-black tracking-widest text-primary leading-none">
           HX9Q-7M3K-P2VD
         </p>
         <p className="text-muted-foreground mt-4">
           Save this code as proof of completion.
         </p>
         <p className="text-primary font-semibold text-lg mt-6">
           Go create something that matters.
         </p>
       </div>
     </div>
   );
 };
 
 export default CompleteSection;