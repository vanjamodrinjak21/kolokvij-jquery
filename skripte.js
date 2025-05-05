var mobiteliData = [];

$( function() {

    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const lightIcon = '☀️';
    const darkIcon = '🌙';

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeSwitcher.textContent = lightIcon;
            themeSwitcher.setAttribute('aria-label', 'Toggle Light Mode');
        } else {
            body.removeAttribute('data-theme');
            themeSwitcher.textContent = darkIcon;
            themeSwitcher.setAttribute('aria-label', 'Toggle Dark Mode');
        }
    }

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    }

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    themeSwitcher.addEventListener('click', toggleTheme);

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    $.ajax({
        url: 'mobiteli.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            mobiteliData = data;
            populateGodinaSelect();
            prikaziMobitele(0);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error loading mobiteli.json: ", textStatus, errorThrown);
        }
    });

    $( "#tabs" ).tabs();

    $('#prosjek .broj').on('input', function() {
        const brojevi = [];
        $('#prosjek .broj').each(function() {
            brojevi.push(parseFloat($(this).val()) || 0);
        });

        if (brojevi.length === 4) {
            const avg = prosjek(brojevi[0], brojevi[1], brojevi[2], brojevi[3]);
            $('#rezultat_prosjeka').text(avg.toFixed(2));
        }
    });

    $('#godina_select').on('change', function() {
        const odabranaGodina = parseInt($(this).val());
        prikaziMobitele(odabranaGodina);
    });

} );

function populateGodinaSelect() {
    const godine = [...new Set(mobiteliData.map(mobitel => mobitel.god_proizv))].sort();
    const $select = $('#godina_select');

    $select.append($('<option>', {
        value: 0,
        text: '(Sve godine)'
    }));

    godine.forEach(godina => {
        $select.append($('<option>', {
            value: godina,
            text: godina
        }));
    });

    $select.val(0);
}

function prikaziMobitele(godinaFilter) {
    const $tbody = $('#mobiteli_table tbody');
    $tbody.empty();

    const filtriraniMobiteli = godinaFilter === 0
        ? mobiteliData
        : mobiteliData.filter(mobitel => mobitel.god_proizv === godinaFilter);

    const headers = ['Proizvođač', 'Logo', 'Model', 'Oznaka', 'God. Proizv.'];

    filtriraniMobiteli.forEach(mobitel => {
        const row = `<tr>
                        <td data-label="${headers[0]}">${mobitel.proizvodjac}</td>
                        <td data-label="${headers[1]}"><img src="assets/${mobitel.logo}" alt="${mobitel.proizvodjac} Logo"></td>
                        <td data-label="${headers[2]}">${mobitel.model}</td>
                        <td data-label="${headers[3]}">${mobitel.oznaka}</td>
                        <td data-label="${headers[4]}">${mobitel.god_proizv}</td>
                     </tr>`;
        $tbody.append(row);
    });
}

function prosjek(br1, br2, br3, br4) {
    const suma = br1 + br2 + br3 + br4;
    return suma / 4;
} 