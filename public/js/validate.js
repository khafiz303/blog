document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.querySelector('input[name=email]').value;
    let full_name = document.querySelector('input[name=full_name]').value;
    let password = document.querySelector('input[name=password]').value;
    let re_password = document.querySelector('input[name=re_password]').value;

    let isValidation = true;

    if (!email) {
        document.getElementById('emailError').style.display = 'block';
        isValidation = false;
        return
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    if (!full_name) {
        document.getElementById('nameError').style.display = 'block';
        isValidation = false
        return
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    if (!(password && password.length >= 8)) {
        document.getElementById('passwordError').style.display = 'block';
        isValidation = false;
        return
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    if (password !== re_password) {
        document.getElementById('re_passwordError').style.display = 'block';
        isValidation = false;
        return
    } else {
        document.getElementById('re_passwordError').style.display = 'none';
    }

    if (isValidation) {
        this.submit();
    }
});
