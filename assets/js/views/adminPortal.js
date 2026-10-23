
        let currentImageData = "";
        let activeFilter = "All";
        let vaultItems = [
            {
                id: 1,
                title: "Calm Morning Reflection Sheets",
                category: "Journal Page",
                description: "Start your morning with quiet intention. Includes daily gratitude prompts, mood trackers, and mindfulness notes.",
                format: "PDF • A4 & Letter",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
                url: "https://canva.com/design/example-1",
                downloads: 142
            },
            {
                id: 2,
                title: "Weekly Creative Blueprint",
                category: "Creative Notebook",
                description: "A structured weekly layout designed for dreamers and notebook enthusiasts to map ideas over coffee.",
                format: "PDF • High Res",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
                url: "https://canva.com/design/example-2",
                downloads: 98
            },
            {
                id: 3,
                title: "Cozy Affirmation Quote Cards",
                category: "Reflection Cards",
                description: "Cut-out affirmation cards featuring original thoughts from Yellow Coffee Cup to tuck inside your journal.",
                format: "PDF • Cut-out Ready",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
                url: "https://canva.com/design/example-3",
                downloads: 215
            }
        ];


        function renderItems() {
            const listContainer = document.getElementById('vaultItemsList');
            
            // Calculate Total Downloads & Items
            const totalItems = vaultItems.length;
            const totalDownloads = vaultItems.reduce((acc, curr) => acc + curr.downloads, 0);

            document.getElementById('statTotalItems').innerText = totalItems;
            document.getElementById('statTotalDownloads').innerText = totalDownloads.toLocaleString();

            // Calculate Most Popular Category
            const categoryCounts = {};
            vaultItems.forEach(item => {
                categoryCounts[item.category] = (categoryCounts[item.category] || 0) + item.downloads;
            });
            let topCat = "Journal Page";
            let maxDownloads = -1;
            for (const cat in categoryCounts) {
                if (categoryCounts[cat] > maxDownloads) {
                    maxDownloads = categoryCounts[cat];
                    topCat = cat;
                }
            }
            document.getElementById('statPopularCat').innerText = topCat;

            // Filter items based on selected tab
            const filtered = activeFilter === "All" 
                ? vaultItems 
                : vaultItems.filter(item => item.category === activeFilter);

            if (filtered.length === 0) {
                listContainer.innerHTML = `
                    <div class="py-12 text-center bg-cozyBg rounded-2xl border border-cozyBorder">
                        <div class="w-10 h-10 rounded-full bg-yellowSoft flex items-center justify-center text-yellowAccent mx-auto mb-2">
                            <i data-lucide="coffee" class="w-5 h-5"></i>
                        </div>
                        <p class="text-xs font-semibold text-coffeeDark">No printables in this category yet.</p>
                        <p class="text-[11px] text-coffeeMuted">Use the form on the left to upload new printable images!</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            listContainer.innerHTML = filtered.map((item) => {
                // Find actual index in real array for operations
                const realIndex = vaultItems.findIndex(i => i.id === item.id);
                
                return `
                <div class="bg-cozyBg border border-cozyBorder rounded-2xl overflow-hidden hover:border-yellowAccent/50 transition-all shadow-xs group flex flex-col sm:flex-row">
                    <!-- Thumbnail Image Display -->
                    <div class="sm:w-36 h-36 bg-cozyBorder/40 relative overflow-hidden shrink-0">
                        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        <span class="absolute top-2 left-2 bg-cozyCard/90 backdrop-blur-xs text-coffeeDark text-[9px] font-bold px-2 py-0.5 rounded-full border border-cozyBorder uppercase">
                            ${escapeHtml(item.category)}
                        </span>
                    </div>

                    <!-- Item Details & Stats -->
                    <div class="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h3 class="font-serif font-bold text-base text-coffeeDark group-hover:text-yellowDark transition-colors">
                                    ${escapeHtml(item.title)}
                                </h3>
                                <!-- Realtime Download Counter Badge -->
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold shrink-0 border border-amber-200 shadow-2xs">
                                    <i data-lucide="download" class="w-3 h-3 text-amber-600"></i>
                                    <span>${item.downloads} downloads</span>
                                </span>
                            </div>
                            <p class="text-coffeeMuted text-xs leading-relaxed mb-3 line-clamp-2">
                                ${escapeHtml(item.description)}
                            </p>
                        </div>

                        <!-- Card Footer Controls -->
                        <div class="flex items-center justify-between pt-3 border-t border-cozyBorder/70 text-xs gap-2">
                            <span class="text-[10px] text-coffeeLight font-medium truncate">${escapeHtml(item.format)}</span>

                            <div class="flex items-center gap-2">
                                <!-- Increment Live Download Simulator -->
                                <button onclick="simulateDownload(${realIndex})" title="Simulate a real-time download by a visitor" class="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] transition-all inline-flex items-center gap-1 active:scale-95 shadow-2xs">
                                    <i data-lucide="plus" class="w-3 h-3"></i>
                                    <span>+1 Download</span>
                                </button>

                                <button onclick="editItem(${realIndex})" class="px-2.5 py-1.5 rounded-xl border border-cozyBorder bg-cozyCard hover:bg-yellowSoft text-coffeeDark font-semibold text-[11px] transition-colors inline-flex items-center gap-1">
                                    <i data-lucide="edit-2" class="w-3 h-3 text-yellowAccent"></i>
                                    <span>Edit</span>
                                </button>

                                <button onclick="deleteItem(${realIndex})" class="px-2.5 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-[11px] transition-colors inline-flex items-center gap-1">
                                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}).join('');

            lucide.createIcons();
        }


        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert("Image size should be under 5MB!");
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentImageData = e.target.result;
                    displayImagePreview(currentImageData);
                };
                reader.readAsDataURL(file);
            }
        }


        function handleImageUrlInput() {
            const url = document.getElementById('imageUrlInput').value.trim();
            if (url) {
                currentImageData = url;
                displayImagePreview(url);
            }
        }

        function displayImagePreview(src) {
            document.getElementById('imagePreview').src = src;
            document.getElementById('uploadPrompt').classList.add('hidden');
            document.getElementById('imagePreviewContainer').classList.remove('hidden');
        }

        function removeImage(event) {
            if (event) event.stopPropagation();
            currentImageData = "";
            document.getElementById('imageFileInput').value = "";
            document.getElementById('imageUrlInput').value = "";
            document.getElementById('imagePreview').src = "";
            document.getElementById('uploadPrompt').classList.remove('hidden');
            document.getElementById('imagePreviewContainer').classList.add('hidden');
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const editIdx = parseInt(document.getElementById('editIndex').value);
            
            // Fallback image if none uploaded
            const finalImage = currentImageData || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80";

            const newItem = {
                id: editIdx >= 0 ? vaultItems[editIdx].id : Date.now(),
                title: document.getElementById('titleInput').value.trim(),
                category: document.getElementById('categoryInput').value,
                description: document.getElementById('descriptionInput').value.trim(),
                format: document.getElementById('formatInput').value.trim(),
                image: finalImage,
                url: document.getElementById('linkInput').value.trim(),
                downloads: editIdx >= 0 ? vaultItems[editIdx].downloads : 0
            };

            if (editIdx >= 0) {
                vaultItems[editIdx] = newItem;
                showToast("Printable updated successfully!");
            } else {
                vaultItems.unshift(newItem);
                showToast("New printable published with image!");
            }

            resetForm();
            renderItems();
        }

        function simulateDownload(index) {
            vaultItems[index].downloads += 1;
            renderItems();
            showToast(`Realtime download count updated for "${vaultItems[index].title}"!`);
        }


        function filterCategory(category) {
            activeFilter = category;
            document.querySelectorAll('.filter-tab').forEach(tab => {
                if (tab.innerText.toLowerCase().includes(category.toLowerCase()) || (category === 'All' && tab.innerText === 'All')) {
                    tab.className = 'filter-tab px-3 py-1.5 rounded-full text-[11px] font-bold bg-yellowAccent text-white transition-all shrink-0';
                } else {
                    tab.className = 'filter-tab px-3 py-1.5 rounded-full text-[11px] font-medium bg-cozyBg hover:bg-yellowSoft text-coffeeDark transition-all shrink-0';
                }
            });
            renderItems();
        }


        function editItem(index) {
            const item = vaultItems[index];
            document.getElementById('editIndex').value = index;
            document.getElementById('titleInput').value = item.title;
            document.getElementById('categoryInput').value = item.category;
            document.getElementById('descriptionInput').value = item.description;
            document.getElementById('formatInput').value = item.format;
            document.getElementById('linkInput').value = item.url;

            if (item.image) {
                currentImageData = item.image;
                displayImagePreview(item.image);
            }

            document.getElementById('formTitle').innerText = "Edit Printable";
            document.getElementById('submitBtnText').innerText = "Update Printable";
            document.getElementById('cancelEditBtn').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }


        function deleteItem(index) {
            const confirmed = confirm(`Are you sure you want to remove "${vaultItems[index].title}" from the Vault Library?`);
            if (confirmed) {
                vaultItems.splice(index, 1);
                showToast("Item removed from Library.");
                resetForm();
                renderItems();
            }
        }

        // Reset Form
        function resetForm() {
            document.getElementById('printableForm').reset();
            document.getElementById('editIndex').value = "-1";
            document.getElementById('formTitle').innerText = "Publish New Printable";
            document.getElementById('submitBtnText').innerText = "Publish to Visitor Vault";
            document.getElementById('cancelEditBtn').classList.add('hidden');
            removeImage();
        }

        // Toast Helper
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // Sanitize string helper
        function escapeHtml(str) {
            return str.replace(/[&<>"']/g, function(m) {
                return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
            });
        }

        window.onload = function() {
            renderItems();
        };