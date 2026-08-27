#!/usr/bin/env bash
# ==============================================================================
#  COMPILATEUR DU CAHIER DES CHARGES DU MINI-PROJET DATA MINING
# ==============================================================================

CYAN='\033[1;36m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
PURPLE='\033[1;35m'
BOLD='\033[1m'
NC='\033[0m'

ROOT_DIR="/home/adel/Documents/Data_mining_Course"
PROPOSAL_DIR="$ROOT_DIR/proposals_and_projects/MiniProject_Proposal"
PDF_OUTPUT_DIR="$ROOT_DIR/PDFs_of_PPTs"

mkdir -p "$PDF_OUTPUT_DIR"
cd "$PROPOSAL_DIR" || exit 1

echo -e "${CYAN}==============================================================================${NC}"
echo -e "${BOLD}${PURPLE}       🎓 COMPILATION DU CAHIER DES CHARGES DU MINI-PROJET 🎓       ${NC}"
echo -e "${CYAN}==============================================================================${NC}"

echo -e "    ${YELLOW}[⚙] Compilation LaTeX Passe 1/2...${NC}"
pdflatex -interaction=nonstopmode mini_project_proposal.tex > compilation.log 2>&1

echo -e "    ${YELLOW}[⚙] Compilation LaTeX Passe 2/2...${NC}"
pdflatex -interaction=nonstopmode mini_project_proposal.tex >> compilation.log 2>&1

if [ -s "mini_project_proposal.pdf" ]; then
    num_pages=$(pdfinfo mini_project_proposal.pdf 2>/dev/null | grep "Pages:" | awk '{print $2}')
    file_size=$(du -h mini_project_proposal.pdf | awk '{print $1}')
    
    cp mini_project_proposal.pdf "$PDF_OUTPUT_DIR/MiniProject_Proposal.pdf"
    
    echo -e "    ${GREEN}${BOLD}[✓] COMPILATION ET GÉNÉRATION RÉUSSIES !${NC}"
    echo -e "    📄 Fichier PDF Local : ${CYAN}$PROPOSAL_DIR/mini_project_proposal.pdf${NC} (${BOLD}${num_pages:-?} pages${NC}, ${BOLD}${file_size}${NC})"
    echo -e "    📁 PDF Centralisé   : ${PURPLE}$PDF_OUTPUT_DIR/MiniProject_Proposal.pdf${NC}"
else
    echo -e "    ${RED}${BOLD}[✗] ÉCHEC DE COMPILATION !${NC}"
    echo -e "    🔍 Consulter : ${RED}$PROPOSAL_DIR/compilation.log${NC}"
fi
