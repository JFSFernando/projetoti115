document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const recaptcha = document.getElementById('recaptchaCheck');
    
    if(!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('error');
        document.getElementById('emailError').classList.add('show');
        valid = false;
    } else { email.classList.remove('error'); document.getElementById('emailError').classList.remove('show'); }
    
    if (password.value.length < 6) {
        password.classList.add('error');
        document.getElementById('passwordError').classList.add('show');
        valid = false;
    } else { password.classList.remove('error'); document.getElementById('passwordError').classList.remove('show'); }
    
    if (!recaptcha.checked) {
        document.getElementById('recaptchaError').classList.add('show');
        valid = false;
    } else { document.getElementById('recaptchaError').classList.remove('show'); }
    
    if (valid) {
        document.getElementById('loginBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Autenticando...';
        document.getElementById('loginBtn').disabled = true;
        
        setTimeout(() => {
            document.getElementById('loginBtn').innerHTML = '<i class="fas fa-check"></i> Verificado!';
            document.getElementById('mfaSection').style.display = 'block';
            showToast('Código MFA enviado para seu e-mail', 'success');
        }, 1500);
    }
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const input = document.getElementById('password');
    const icon = this.querySelector('i');
    if (input.type === 'password') { input.type = 'text'; icon.className = 'fas fa-eye-slash'; } 
    else { input.type = 'password'; icon.className = 'fas fa-eye'; }
});

document.getElementById('verifyMfa').addEventListener('click', function() {
    const code = document.getElementById('mfaCode').value;
    if (code.length === 6 && /^\d+$/.test(code)) {
        showToast('✅ Login realizado com sucesso! Redirecionando...', 'success');
        setTimeout(() => showToast('🔒 Redirecionado para sua conta', 'info'), 1000);
    } else {
        document.getElementById('mfaError').classList.add('show');
        setTimeout(() => document.getElementById('mfaError').classList.remove('show'), 3000);
    }
});

document.getElementById('googleAuth').addEventListener('click', function() {
    showToast('🔄 Redirecionando para autenticação Google...', 'info');
    setTimeout(() => showToast('✅ Autenticado com sucesso!', 'success'), 2000);
});

document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgotModal').style.display = 'flex';
});

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('forgotModal').style.display = 'none';
});

document.getElementById('resetBtn').addEventListener('click', function() {
    const email = document.getElementById('resetEmail').value;
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showToast('📧 Link de redefinição enviado para ' + email, 'success');
        document.getElementById('forgotModal').style.display = 'none';
    } else {
        showToast('E-mail inválido', 'error');
    }
});

document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const error = this.parentElement.querySelector('.error-msg');
        if (error) error.classList.remove('show');
    });
});

function showToast(msg, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast ' + type;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('forgotModal')) {
        document.getElementById('forgotModal').style.display = 'none';
    }
});

document.getElementById('recaptchaCheck').addEventListener('change', function() {
    document.getElementById('recaptchaError').classList.remove('show');
});