<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/2000/svg">
	<xsl:template name="x">
		<xsl:choose>
			<xsl:when test="@x">
				<xsl:value-of select="@x"/>
			</xsl:when>
			<xsl:when test="@left">
				<xsl:value-of select="@left"/>
			</xsl:when>
			<xsl:when test="@right and @width">
				<xsl:value-of select="$width - @right - @width"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="y">
		<xsl:choose>
			<xsl:when test="@y">
				<xsl:value-of select="@y"/>
			</xsl:when>
			<xsl:when test="@top">
				<xsl:value-of select="@top"/>
			</xsl:when>
			<xsl:when test="@bottom and @height">
				<xsl:value-of select="$height - @bottom - @height"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="left">
		<xsl:choose>
			<xsl:when test="@left">
				<xsl:value-of select="@left"/>
			</xsl:when>
			<xsl:when test="@x">
				<xsl:value-of select="@x"/>
			</xsl:when>
			<xsl:when test="@right and @width">
				<xsl:value-of select="$width - @right - @width"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="right">
		<xsl:choose>
			<xsl:when test="@right">
				<xsl:value-of select="@right"/>
			</xsl:when>
			<xsl:when test="@left and @width">
				<xsl:value-of select="$width - @left - @width"/>
			</xsl:when>
			<xsl:when test="@x and @width">
				<xsl:value-of select="$width - @x - @width"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="top">
		<xsl:choose>
			<xsl:when test="@top">
				<xsl:value-of select="@top"/>
			</xsl:when>
			<xsl:when test="@y">
				<xsl:value-of select="@y"/>
			</xsl:when>
			<xsl:when test="@bottom and @height">
				<xsl:value-of select="$height - @bottom - @height"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="bottom">
		<xsl:choose>
			<xsl:when test="@bottom">
				<xsl:value-of select="@bottom"/>
			</xsl:when>
			<xsl:when test="@top and @height">
				<xsl:value-of select="$height - @top - @height"/>
			</xsl:when>
			<xsl:when test="@y and @height">
				<xsl:value-of select="$height - @y - @height"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="width">
		<xsl:choose>
			<xsl:when test="@width">
				<xsl:value-of select="@width"/>
			</xsl:when>
			<xsl:when test="@right and @left">
				<xsl:value-of select="$width - @right - @left"/>
			</xsl:when>
			<xsl:when test="@right and @x">
				<xsl:value-of select="$width - @right - @x"/>
			</xsl:when>
			<xsl:when test="@left">
				<xsl:value-of select="$width - @left"/>
			</xsl:when>
			<xsl:when test="@x">
				<xsl:value-of select="$width - @x"/>
			</xsl:when>
			<xsl:when test="@right">
				<xsl:value-of select="$width - @right"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$width"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="height">
		<xsl:choose>
			<xsl:when test="@height">
				<xsl:value-of select="@height"/>
			</xsl:when>
			<xsl:when test="@bottom and @top">
				<xsl:value-of select="$height - @bottom - @top"/>
			</xsl:when>
			<xsl:when test="@bottom and @y">
				<xsl:value-of select="$height - @bottom - @y"/>
			</xsl:when>
			<xsl:when test="@top">
				<xsl:value-of select="$height - @top"/>
			</xsl:when>
			<xsl:when test="@y">
				<xsl:value-of select="$height - @y"/>
			</xsl:when>
			<xsl:when test="@bottom">
				<xsl:value-of select="$height - @bottom"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$height"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>