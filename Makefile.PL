use inc::Module::Install;

RTx('RT-Extension-rt_cpan_org');
all_from        ('lib/RT/Extension/rt_cpan_org.pm');
readme_from     ('lib/RT/Extension/rt_cpan_org.pm');

requires_rt('4.0.0');

requires        'Hook::LexWrap';

WriteAll();
