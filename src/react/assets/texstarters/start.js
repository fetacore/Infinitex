export const startTex = '\\documentclass[12pt,a4paper]{article}\n\
\\usepackage{amsfonts}\n\
\\usepackage[autostyle, english = american]{csquotes}\n\
\\MakeOuterQuote{"}\n\
\\usepackage{graphicx}\n\
\\usepackage{enumitem}\n\
\\usepackage{indentfirst}\n\
\\usepackage{amsmath}\n\
\\usepackage{amssymb}\n\
\\usepackage[hidelinks]{hyperref}\n\
\\setlength{\\baselineskip}{16.0pt}\n\
% \\usepackage[authoryear,comma,numbers,sort]{natbib}\n\
% \\bibliographystyle{abbrvnat}\n\
\\begin{document}\
Press compile PDF to see what happens. The dialog will \
prompt you to save the project. Save with the extension .tex like \"crap.tex\". Create a dedicated folder for the project. \
I recommend you start with a template for maximum productivity. If you want to use the bibliography, do not forget to change the name in the bibliography\n\
% \\citep{stone1977consistent} \n\
brackets before saving the file and always keep them last.\n\
\n\
To change paragraph simply keep a gap line. Enjoy!\n\
\n\
% \\bibliography{NameOfTheProjectWithoutExtension}\
\\end{document}'

export const startBib = '@article{stone1977consistent,\n\
  title={Consistent nonparametric regression},\n\
  author={Stone, Charles J},\n\
  journal={The annals of statistics},\n\
  pages={595--620},\n\
  year={1977},\n\
  publisher={JSTOR}\n\
}'
