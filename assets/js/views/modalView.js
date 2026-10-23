        const tipModal = document.getElementById('tipModal');
        const modalContainer = document.getElementById('modalContainer');
        const selectedTipText = document.getElementById('selectedTipText');

        function openTipModal() {
            tipModal.classList.remove('opacity-0', 'pointer-events-none');
            modalContainer.classList.remove('scale-95');
            modalContainer.classList.add('scale-100');
        }

        function closeTipModal() {
            tipModal.classList.add('opacity-0', 'pointer-events-none');
            modalContainer.classList.remove('scale-100');
            modalContainer.classList.add('scale-95');
        }

        tipModal.addEventListener('click', (e) => {
            if (e.target === tipModal) {
                closeTipModal();
            }
        });

        function selectTipAmount(amount, buttonElement) {
            // Remove highlight style from all tip buttons
            document.querySelectorAll('.tip-btn').forEach(btn => {
                btn.className = 'tip-btn py-3 px-2 rounded-2xl border border-cozyBorder bg-cozyBg text-coffeeDark font-bold text-sm hover:border-yellowAccent hover:bg-yellowSoft/40 transition-all text-center';
            });
            
            buttonElement.className = 'tip-btn py-3 px-2 rounded-2xl border-2 border-yellowAccent bg-yellowSoft/30 text-coffeeDark font-bold text-sm transition-all text-center shadow-xs';
            
            selectedTipText.innerText = `Selected: ${amount}`;
        }

        function copyAccountInfo() {
            const accountInput = document.getElementById('creatorAccount');
            accountInput.select();
            navigator.clipboard.writeText(accountInput.value);
            alert('GCash / Account number copied to clipboard! Thank you so much! 💛');
        }