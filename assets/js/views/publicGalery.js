/*** Renders the printable cards into the visitor vault grid
 * @param {Array} items - The array of printable data objects*/

function renderPrintablesGrid(items) {
    const gridContainer = document.getElementById('printablesGrid');
    const itemCountSpan = document.getElementById('itemCount');

    if (itemCountSpan) {
        itemCountSpan.innerText = `${items.length} items in vault`;
    }

    if (!items || items.length === 0) {
        gridContainer.innerHTML = `
            <div id="emptyState" class="col-span-full py-16 text-center bg-cozyCard rounded-2xl border border-cozyBorder">
                <div class="w-12 h-12 rounded-full bg-yellowSoft flex items-center justify-center mx-auto mb-3 text-yellowAccent">
                    <i data-lucide="coffee" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif font-bold text-coffeeDark text-base mb-1">The vault is currently brewing...</h3>
                <p class="text-coffeeMuted text-xs max-w-sm mx-auto">No printables have been published yet, or check back soon as new pages are added from the admin dashboard.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    gridContainer.innerHTML = items.map(item => `
        <div class="bg-cozyCard rounded-2xl border border-cozyBorder overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            
            <!-- Card Image & Category Badge -->
            <div class="h-48 bg-yellowSoft/50 relative overflow-hidden flex items-center justify-center border-b border-cozyBorder">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-300">
                <span class="absolute top-3 left-3 bg-cozyCard/90 backdrop-blur-xs text-coffeeDark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-cozyBorder shadow-xs">
                    ${escapeHtml(item.category)}
                </span>
            </div>

            <!-- Card Content & Download Button -->
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-serif font-bold text-lg text-coffeeDark mb-1 group-hover:text-yellowDark transition-colors">
                    ${escapeHtml(item.title)}
                </h3>
                <p class="text-coffeeMuted text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
                    ${escapeHtml(item.description)}
                </p>
                <div class="flex items-center justify-between pt-3 border-t border-cozyBorder/60 mt-auto">
                    <span class="text-[11px] text-coffeeLight font-medium">${escapeHtml(item.format)}</span>
                    <button onclick="triggerDownload('${item.id}', '${item.url}')" class="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-yellowSoft text-yellowDark hover:bg-yellowAccent hover:text-white transition-colors">
                        <i data-lucide="download" class="w-3.5 h-3.5"></i>
                        <span>Download</span>
                    </button>
                </div>
            </div>

        </div>
    `).join('');
s
    lucide.createIcons();
}

function triggerDownload(id, url) {
    window.open(url, '_blank');
    
    console.log("Visitor downloaded item ID:", id);
}
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}