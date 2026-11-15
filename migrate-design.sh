#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════ #
# KAWAKI STUDIOS - DESIGN SYSTEM MIGRATION SCRIPT                            #
# Automatically updates all HTML pages with new design system                 #
# ═══════════════════════════════════════════════════════════════════════════ #

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
UPDATED=0
FAILED=0
SKIPPED=0

# Function to add master CSS link
add_master_css() {
    local file=$1
    local temp_file="${file}.tmp"

    # Check if file already has master CSS
    if grep -q "kawaki-master.css" "$file"; then
        echo -e "${YELLOW}[SKIP]${NC} $file (already has master CSS)"
        ((SKIPPED++))
        return 0
    fi

    # Add fonts and master CSS after title tag
    sed '/<title>/a\    \n    <!-- FONTS -->\n    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">\n    \n    <!-- KAWAKI MASTER DESIGN SYSTEM -->\n    <link rel="stylesheet" href="/assets/css/kawaki-master.css">' "$file" > "$temp_file"

    if mv "$temp_file" "$file"; then
        echo -e "${GREEN}[UPDATE]${NC} $file"
        ((UPDATED++))
        return 0
    else
        echo -e "${RED}[FAIL]${NC} $file"
        ((FAILED++))
        return 1
    fi
}

# Function to process all HTML files
process_files() {
    echo -e "${YELLOW}Starting migration...${NC}\n"

    # Find all HTML files in public directory
    while IFS= read -r file; do
        add_master_css "$file"
    done < <(find ./public -name "*.html" -type f)

    echo ""
    echo -e "${GREEN}Migration complete!${NC}"
    echo -e "Updated: ${GREEN}$UPDATED${NC}"
    echo -e "Skipped: ${YELLOW}$SKIPPED${NC}"
    echo -e "Failed: ${RED}$FAILED${NC}"
}

# Main execution
main() {
    echo -e "${YELLOW}═══════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Kawaki Studios Design System Migration${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════${NC}\n"

    # Check if we're in the right directory
    if [ ! -d "public" ]; then
        echo -e "${RED}Error: 'public' directory not found!${NC}"
        echo "Please run this script from the project root."
        exit 1
    fi

    # Check if master CSS exists
    if [ ! -f "public/assets/css/kawaki-master.css" ]; then
        echo -e "${RED}Error: 'public/assets/css/kawaki-master.css' not found!${NC}"
        echo "Please ensure the master CSS file is in place."
        exit 1
    fi

    echo -e "${GREEN}✓${NC} Master CSS found"
    echo -e "${GREEN}✓${NC} Public directory found\n"

    # Process files
    process_files

    if [ $FAILED -eq 0 ]; then
        echo -e "\n${GREEN}All files processed successfully!${NC}"
        exit 0
    else
        echo -e "\n${RED}Some files failed to update. Check them manually.${NC}"
        exit 1
    fi
}

# Run main function
main
