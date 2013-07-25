use inc::Module::Install;

RTx('RT-Extension-rt_cpan_org');
all_from        ('lib/RT/Extension/rt_cpan_org.pm');
readme_from     ('lib/RT/Extension/rt_cpan_org.pm');

requires_rt('4.0.14');

# rt-cpan-export-db
requires 'DBI';
requires 'DBD::SQLite';
requires 'IO::Compress::Gzip';
requires 'File::Spec';
requires 'File::Remove';
requires 'JSON';
requires 'JSON::XS';

WriteAll();
