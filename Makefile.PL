use inc::Module::Install;

RTx('RT-Extension-rt_cpan_org');

abstract        ('The customizations that turn a RT into a RT for rt.cpan.org');
all_from        ('lib/RT/Extension/rt_cpan_org.pm');
license         ('GPL version 2');

requires        'Hook::LexWrap';

WriteAll();
